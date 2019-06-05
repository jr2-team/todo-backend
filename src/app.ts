import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import express from 'express';
import expressValidator from 'express-validator';
import { IExpressController } from './Presenter/Controllers/expressController';

export default class App {
    public app: express.Application;
    public port: number;
    public apiBasePath = '/api/v1';

    constructor(controllers: IExpressController[], port: number) {
        this.app = express();
        this.port = port;
        this.initMiddleware();
        this.initControllers(controllers);
        this.app.use(errorhandler);
    }

    public listen() {
        this.app.set('port', this.port);
        return this.app.listen(this.port, () => {
            console.log(`App is running at http://localhost:${this.port} in DEV mode`);
            console.log('  Press CTRL-C to stop\n');
        });
    }

    private initMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());
    }

    private initControllers(controllers: IExpressController[]) {
        controllers.forEach((controller) => {
            this.app.use(this.apiBasePath, controller.router);
        });
    }
}