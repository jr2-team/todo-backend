import { Request, Response } from 'express';
import express from 'express';
import TaskService from '../../Domain/Services/taskService';
import { IExpressController } from './expressController';

export default class TaskController implements IExpressController {
    public controllerRoute: string;
    public router: express.Router;

    constructor() {
        this.controllerRoute = '/tasks';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router
            .get(this.controllerRoute, this.getAll)
            .post(this.controllerRoute, this.create)
            .put(`${this.controllerRoute}/:taskId`, this.update)
            .delete(`${this.controllerRoute}/:taskId`, this.delete);
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const tasks = await new TaskService().getAll();
        res.statusCode = 200;
        res.json(tasks);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const task = await new TaskService().create(req.body);
        console.log(task);
        res.statusCode = 201;
        res.json(task);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const taskId = Number(req.param('taskId'));
        const task = await new TaskService().update(taskId, req.body);
        if (task) {
            res.statusCode = 200;
            res.json(task);
        } else {
            res.statusCode = 404;
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const taskId = Number(req.params.taskId);
        await new TaskService().delete(taskId);
        res.statusCode = 400;
    }
}