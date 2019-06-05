import express from 'express';

export interface IExpressController {
    controllerRoute: string;
    router: express.Router;
}