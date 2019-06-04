import bodyParser from 'body-parser';
//import config from 'config';
import express from 'express';

import * as taskController from './Presenter/Controllers/taskController';

const app = express();
const apiBasePath = '/api/v1';

// Config Express
app.set('port', /*config.get('server.port')*/8080);
app.use(bodyParser.json());

// Config API routes
app.get(`${apiBasePath}/test`, (req, res) => {
    res.send('Test');
});
app.get(`${apiBasePath}/tasks`, taskController.getAll);
app.post(`${apiBasePath}/tasks`, taskController.create);

export default app;