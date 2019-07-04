import { Connection } from 'typeorm'

export default interface IDatabase {
    getConnection(): Promise<Connection>
}