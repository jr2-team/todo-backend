import { NextFunction, Request, Response, Router } from 'express'
import TaskCreateDto from '../../domain/dto/TaskCreateDto'
import TaskService from '../../domain/service/TaskService'
import HttpException from '../../util/exception/HttpException'
import validationMiddleware from '../../util/middleware/validator.middleware'
import IExpressController from './ExpressController'

export default class TaskController implements IExpressController {
    public readonly controllerRoute: string
    public readonly router: Router

    constructor() {
        this.controllerRoute = '/tasks'
        this.router = Router()
        this.initRoutes()
    }

    public async initRoutes() {
        this.router
            .get(`${this.controllerRoute}/:taskId`, this.getBy)
            .get(this.controllerRoute, this.getAll)
            .post(this.controllerRoute, await validationMiddleware(TaskCreateDto), this.create)
            .put(
                `${this.controllerRoute}/:taskId`,
                await validationMiddleware(TaskCreateDto),
                this.update,
            )
            .delete(`${this.controllerRoute}/:taskId`, this.delete)
    }

    public async getBy(req: Request, res: Response, next: NextFunction) {
        const taskId = Number(req.params.taskId)

        await new TaskService().getById(taskId)
            .catch((err) => next(new HttpException(400, err)))
            .then((task) => task ? res.status(200).json(task) : res.sendStatus(404))
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        await new TaskService().getAll()
            .catch((err) => next(new HttpException(400, err)))
            .then((tasks) => res.status(200).json(tasks))
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const taskCreateDto: TaskCreateDto = req.body

        await new TaskService().create(taskCreateDto)
            .catch((err) => next(new HttpException(400, err)))
            .then((task) => res.status(201).json(task))
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const taskId = Number(req.params.taskId)
        const taskCreateDto: TaskCreateDto = req.body

        await new TaskService().update(taskId, taskCreateDto)
            .catch((err) => next(new HttpException(400, err)))
            .then((task) => task ? res.status(200).json(task) : res.sendStatus(404))
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const taskId = Number(req.params.taskId)

        await new TaskService().delete(taskId)
            .catch((err) => next(new HttpException(400, err)))
            .then((suc) => (suc) ? res.sendStatus(204) : res.sendStatus(404))
    }
}