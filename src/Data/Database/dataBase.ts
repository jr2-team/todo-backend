import config from 'config';
import { createConnection } from 'typeorm';
import { Task } from '../../Domain/DbModels/task';

const dbConn = createConnection({
    database: `${config.get('database.localPath')}${config.get('database.localFile')}`,
    entities: [
        Task,
    ],
    type: 'sqlite',
});

export default dbConn;