import { Router } from 'express'
import TaskService from '../../domain/service/TaskService'

export default abstract class ExpressController {
    public readonly controllerNamespace: string
    public readonly router: Router

    constructor(controllerNamespace: string) {
        this.controllerNamespace = controllerNamespace
        this.router = Router()
        this.initRoutes()
    }

    public abstract initRoutes(): Promise<void>
}