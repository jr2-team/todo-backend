import { Task } from '../DbModels/task';
import { TaskInDto } from '../Dto/TaskInDto';

export let getAll = async () => {
    return await Task.findAll();
};

export let create = async (taskInDto: TaskInDto) => {
    const task = await Task.create({
        name: taskInDto.name,
        state: taskInDto.state,
    });
    return task;
};