import { NextFunction, Request, Response } from 'express'

const socketIOMiddleware = async (action: () => Promise<void>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        await action()
        return next()
    }

export default socketIOMiddleware