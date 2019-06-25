import config from 'config'
import 'reflect-metadata'
import { Server as ServerIO } from 'socket.io'
import { createConnection } from 'typeorm'
import dbConfig from './data/database/db.config'
import ExpressApp from './ExpressApp'

const initConnectionToDb = async () => {
    return await createConnection(dbConfig).catch((err) => {
        console.log('An error has occurred during connection to DB')
        return err
    })
}

const initExpressApp = () => {
    const expressApp = new ExpressApp(config.get('server.port'))
    expressApp.listen()
}

const server = async () => {
    await initConnectionToDb()
    initExpressApp()
}

export let io: ServerIO

export default server()