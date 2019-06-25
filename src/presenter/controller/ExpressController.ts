import express from 'express'
import { Router } from 'express'

export default abstract class ExpressController {
    public readonly controllerNamespace: string
    public readonly router: express.Router

    constructor(controllerNamespace: string) {
        this.controllerNamespace = controllerNamespace
        this.router = Router()
        this.initRoutes()
    }

    public abstract initRoutes(): Promise<void>
}