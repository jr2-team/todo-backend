import bodyParser from 'body-parser'
import errorhandler from 'errorhandler'
import express, { Application } from 'express'
import helmet from 'helmet'
import { Server as HttpServer } from 'http'
import io, { Server as IOServer } from 'socket.io'
import ExpressController from './presenter/controller/ExpressController'
import TaskController from './presenter/controller/TaskController'
import ExpressSocket from './presenter/websocket/ExpressSocket'
import TaskSocket from './presenter/websocket/TaskSocket'
import corsMiddleware from './util/middleware/cors.middleware'
import errorMiddleware from './util/middleware/error.middleware'

export default class ExpressApp {
    public readonly app: Application
    public readonly io: IOServer
    public readonly port: number
    public readonly apiBasePath = '/api/v1'
    public readonly sioBasePath = '/sio/v1'

    constructor(port: number) {
        this.app = express()
        this.io = io()
        this.port = port
        this.initMiddleware()
        this.initControllers()
        this.initErrorHandling()
    }

    public listen() {
        this.app.set('port', this.port)
        const server = this.app
            .listen(this.port, () => {
                console.log(`App is running at http://localhost:${this.port}`)
                console.log('  Press CTRL-C to stop\n')
            })
            .setTimeout(1000)
        this.initWebSockets(server)
        return server
    }

    private initMiddleware() {
        this.app.use(bodyParser.json())
        this.app.use(corsMiddleware)
        //this.app.use(helmet())
    }

    private initErrorHandling() {
        this.app.use(errorMiddleware)
        this.app.use(errorhandler())
    }

    private initControllers() {
        const controllers: ExpressController[] = [
            new TaskController('/tasks'),
        ]
        controllers.forEach((controller) => {
            this.app.use(this.apiBasePath, controller.router)
        })
    }

    private initWebSockets(server: HttpServer) {
        this.io.attach(server)
        const webSockets: ExpressSocket[] = [
            new TaskSocket(`${this.sioBasePath}/tasks`, this.io),
        ]
        webSockets.forEach((x) => x.onConnection())
    }
}