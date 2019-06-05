import config from 'config';
import 'reflect-metadata';
import App from './app';
import TaskController from './Presenter/Controllers/taskController';

const app = new App(
    [
        new TaskController(),
    ],
    config.get('server.port'),
);
const server = app.listen();

export default server;