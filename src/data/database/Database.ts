import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import Task from '../../domain/db-model/Task'
import IDatabase from './IDatabase'

export default class Database implements IDatabase {
    private readonly connectionOptions: ConnectionOptions
    private connection!: Connection

    constructor(connectionStr: string) {
        this.connectionOptions = this.getConnectionOptions(connectionStr)
    }

    public establishConnection = async (): Promise<Connection> => {
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
