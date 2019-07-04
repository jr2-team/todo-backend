import { NextFunction, Request, Response } from 'express'

const socketMiddleware = async (action: () => Promise<void>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            await action()
        }
        return next()
    }

export default socketMiddleware