import { NextFunction, Request, Response } from 'express'
import TaskCreateDto from '../../domain/dto/TaskCreateDto'
import TaskService from '../../domain/service/TaskService'
import socketIOMiddleware from '../../util/middleware/socketio.middleware'
import validationMiddleware from '../../util/middleware/validator.middleware'
import { receiveTasks } from '../websocket/TaskSocketIO'
import ExpressController from './ExpressController'

export default class TaskController extends ExpressController {
    constructor(controllerNamespace: string) {
        super(controllerNamespace)
    }

    public async initRoutes() {
        this.router
            .get(`${this.controllerNamespace}/:taskId`, this.getBy)
            .get(this.controllerNamespace, this.getAll)
            .post(
                this.controllerNamespace,
                await validationMiddleware(TaskCreateDto),
                this.create,
                await socketIOMiddleware(receiveTasks),
            )
            .put(
                `${this.controllerNamespace}/:taskId`,
                await validationMiddleware(TaskCreateDto),
                this.update,
                await socketIOMiddleware(receiveTasks)
            )
            .delete(
                `${this.controllerNamespace}/:taskId`,
                this.delete,
                await socketIOMiddleware(receiveTasks),
            )
    }

    public async getBy(req: Request, res: Response, next: NextFunction) {
        const taskId = Number(req.params.taskId)

        await new TaskService().getById(taskId)
            .then((task) => task ? res.status(200).json(task) : res.sendStatus(404))
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        await new TaskService().getAll()
            .then((tasks) => res.status(200).json(tasks))
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const taskCreateDto: TaskCreateDto = req.body

        await new TaskService().create(taskCreateDto)
            .then(async (task) => {
                res.status(201).json(task)
            })
        await next()
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const taskId = Number(req.params.taskId)
        const taskCreateDto: TaskCreateDto = req.body

        await new TaskService().update(taskId, taskCreateDto)
            .then(async (task) => {
                task ? res.status(200).json(task) : res.sendStatus(404)
            })
        await next()
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const taskId = Number(req.params.taskId)

        await new TaskService().delete(taskId)
            .then(async (success) => success ? res.sendStatus(204) : res.sendStatus(404))
        await next()
    }
}