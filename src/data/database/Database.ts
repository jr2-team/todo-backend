import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import Task from '../../domain/db-model/Task'
import IDatabase from './IDatabase'

class DatabaseImpl implements IDatabase {
    private readonly connectionOptions: ConnectionOptions
    private connection!: Connection

    constructor(connectionStr: string) {
        this.connectionOptions = this.getConnectionOptions(connectionStr)
    }

    public getConnection = async (): Promise<Connection> => {
        if (!this.connection) {
            this.connection = await this.initConnectionToDb()
        }
        return this.connection
    }

    private getConnectionOptions = (connectionStr: string): ConnectionOptions => ({
        database: connectionStr,
        entities: [
            Task,
        ],
        type: 'sqlite',
    })

    private initConnectionToDb = async (): Promise<Connection> => {
        return await createConnection(this.connectionOptions)
            .then((connection) => this.connection = connection)
            .catch((error: Error) => { throw error })
    }
}

const getDbConnection = async (connectionStr: string) =>
    await new DatabaseImpl(connectionStr).getConnection()

export default getDbConnection
