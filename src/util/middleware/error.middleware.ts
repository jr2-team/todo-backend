import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/HttpException';

const errorMiddleware = (
    exception: HttpException,
    req: Request, res: Response, next: NextFunction,
) => {
    const status = exception.status || 500;
    const message = exception.message || 'An error has ocurred';
    res.status(status).send({ status, message });
};

export default errorMiddleware;