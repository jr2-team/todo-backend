import { Request, Response } from 'express';
import * as taskService from '../../Domain/Services/taskService';

export let getAll = async (req: Request, res: Response) => {
    const tasks = await taskService.getAll();
    res.json(tasks);
};

export let create = async(req: Request, res: Response) => {
    const task = await taskService.create(req.body);
    res.json(task);
}