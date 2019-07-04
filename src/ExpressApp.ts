import bodyParser from 'body-parser'
import config from 'config'
import errorhandler from 'errorhandler'
import express, { Application } from 'express'
import { Server as HttpServer } from 'http'
import io, { Server as IOServer } from 'socket.io'
import getDbConnection from './data/database/Database'
import ExpressController from './presenter/controller/ExpressController'
import TaskController from './presenter/controller/TaskController'
import ExpressSocket from './presenter/websocket/ExpressSocket'
import TaskSocket from './presenter/websocket/TaskSocket'
import corsMiddleware from './util/middleware/cors.middleware'
import errorMiddleware from './util/middleware/error.middleware'
import Database from './data/database/Database';

export default class ExpressApp {
    private readonly app: Application
    private readonly io: IOServer
    private readonly apiBasePath = '/api/v1'
    private readonly sioBasePath = '/sio/v1'

    constructor() {
        this.app = express()
        this.io = io()
    }

    public start = async () => {
        await this.build()
        const port = config.get('server.port')
        this.app.set('port', port)
        const server = this.app
            .listen(port, () => {
                console.log(`App is running at http://localhost:${port}`)
                console.log('  Press CTRL-C to stop\n')
            })
            .setTimeout(1000)
        this.initWebSockets(server)
        return server
    }

    private build = async () => {
        await this.initConnectionToDb()
        this.initMiddleware()
        this.initControllers()
        this.initErrorHandling()
    }

    private initConnectionToDb = async () => {
        const connectionStr =
            `${config.get('database.localPath')}${config.get('database.localFile')}`
        await new Database(connectionStr).establishConnection()
    }

    private initMiddleware = () => {
        this.app.use(bodyParser.json())
        this.app.use(corsMiddleware)
        // this.app.use(helmet())
    }

    private initErrorHandling = () => {
        this.app.use(errorMiddleware)
        this.app.use(errorhandler())
    }

    private initControllers = () => {
        const controllers: ExpressController[] = [
            new TaskController('/tasks'),
        ]
        controllers.forEach((controller) => {
            this.app.use(this.apiBasePath, controller.router)
        })
    }

    private initWebSockets = (server: HttpServer) => {
        this.io.attach(server)
        const webSockets: ExpressSocket[] = [
            new TaskSocket(`${this.sioBasePath}/tasks`, this.io),
        ]
        webSockets.forEach((x) => x.onConnection())
    }
}