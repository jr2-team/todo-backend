import config from 'config'
import getDbConnection from './data/database/Database'
import ExpressApp from './ExpressApp'

const initConnectionToDb = async () => {
    const connectionStr = `${config.get('database.localPath')}${config.get('database.localFile')}`
    return await getDbConnection(connectionStr)
}

const initExpressApp = () => {
    const expressApp = new ExpressApp(config.get('server.port'))
    expressApp.listen()
}

const server = async () => {
    await initConnectionToDb()
    initExpressApp()
}

export default server()