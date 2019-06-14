import config from 'config'
import { ConnectionOptions } from 'typeorm'
import Task from '../../domain/db-model/Task'

const dbConfig: ConnectionOptions = {
    database: `${config.get('database.localPath')}${config.get('database.localFile')}`,
    entities: [
        Task,
    ],
    type: 'sqlite',
}

export default dbConfig