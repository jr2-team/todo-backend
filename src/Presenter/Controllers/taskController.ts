import { Request, Response } from 'express';
import express from 'express';
import TaskService from '../../Domain/Services/taskService';
import { IExpressController } from './expressController';
import { check, validationResult } from 'express-validator/check';

export default class TaskController implements IExpressController {
    public controllerRoute: string;
    public router: express.Router;

    constructor() {
        this.controllerRoute = '/tasks';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        const taskInValidationRules = [
            check('name').isLength({ min: 1, max: 250 }),
            check('state').isInt().isIn([ '0', '1' ]),
        ];
        this.router
            .get(this.controllerRoute, this.getAll)
            .post(this.controllerRoute, taskInValidationRules, this.create)
            .put(`${this.controllerRoute}/:taskId`, taskInValidationRules, this.update)
            .delete(`${this.controllerRoute}/:taskId`, this.delete);
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const tasks = await new TaskService().getAll();
        res.status(200).json(tasks);
    }

    public async create(req: Request, res: Response): Promise<void | Response> {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const task = await new TaskService().create(req.body);
        res.status(201).json(task);
    }

    public async update(req: Request, res: Response): Promise<void | Response> {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const taskId = Number(req.param('taskId'));
        const task = await new TaskService().update(taskId, req.body);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const taskId = Number(req.params.taskId);
        await new TaskService().delete(taskId);
        res.status(400);
    }
}