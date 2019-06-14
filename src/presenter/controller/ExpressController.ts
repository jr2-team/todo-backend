import express from 'express'

export default interface IExpressController {
    readonly controllerRoute: string
    readonly router: express.Router
}