import { Connection } from 'typeorm'

export default interface IDatabase {
    establishConnection(): Promise<Connection>
}