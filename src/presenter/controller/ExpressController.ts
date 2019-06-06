import express from 'express';

export default interface IExpressController {
    controllerRoute: string;
    router: express.Router;
}