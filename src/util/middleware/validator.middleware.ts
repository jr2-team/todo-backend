import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpException from '../exception/HttpException';

const validationMiddleware = async (type: any): Promise<RequestHandler> =>
    async (req: Request, res: Response, next: NextFunction) => {
        const validationErrors = await validate(plainToClass(type, req.body));
        if (validationErrors.length > 0) {
            const message = validationErrors
                .map((x) => Object.values(x.constraints).join('\n'));
            return next(new HttpException(400, message));
        }
        return next();
    };

export default validationMiddleware;