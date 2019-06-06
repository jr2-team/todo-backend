import config from 'config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dbConfig from './data/database/db.config';
import ExpressApp from './ExpressApp';
import TaskController from './presenter/controller/TaskController';

const initConnectionToDb = async () => {
    return await createConnection(dbConfig).catch((err) => {
        console.log('An error has occurred during connection to DB');
        return err;
    });
};

const initExpressApp = () => {
    const availableControllers = [
        new TaskController(),
    ];
    return new ExpressApp(availableControllers, config.get('server.port')).listen();
};

const server = async () => {
    await initConnectionToDb();
    initExpressApp();
};

export default server();