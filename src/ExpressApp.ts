import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import express, { Application } from 'express';
import IExpressController from './presenter/controller/ExpressController';
import errorMiddleware from './util/middleware/error.middleware';

export default class ExpressApp {
    public app: Application;
    public port: number;
    public apiBasePath = '/api/v1';

    constructor(controllers: IExpressController[], port: number) {
        this.app = express();
        this.port = port;
        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorHandling();
    }

    public listen() {
        this.app.set('port', this.port);
        return this.app
            .listen(this.port, () => {
                console.log(`App is running at http://localhost:${this.port} in DEV mode`);
                console.log('  Press CTRL-C to stop\n');
            })
            .setTimeout(1000);
    }

    private initMiddleware() {
        this.app.use(bodyParser.json());
    }

    private initErrorHandling() {
        this.app.use(errorMiddleware);
        this.app.use(errorhandler);
    }

    private initControllers(controllers: IExpressController[]) {
        controllers.forEach((controller) => {
            this.app.use(this.apiBasePath, controller.router);
        });
    }
}