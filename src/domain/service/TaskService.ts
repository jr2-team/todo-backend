import { DeleteResult, getRepository } from 'typeorm';
import Task from '../db-model/Task';
import TaskCreateDto from '../dto/TaskCreateDto';

export default class TaskService {
    private taskRepository = getRepository(Task);

    public async getAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    public async getById(id: number): Promise<Task | undefined> {
        return await this.taskRepository.findOne(id);
    }

    public async create(taskInDto: TaskCreateDto): Promise<Task> {
        const task = await this.taskRepository.create({
            name: taskInDto.name,
            state: Number(taskInDto.state),
        });
        return await this.taskRepository.save(task);
    }

    public async update(id: number, taskInDto: TaskCreateDto): Promise<Task | undefined> {
        const task = await this.taskRepository.findOne(id);
        if (task) {
            await this.taskRepository.merge(task, {
                name: taskInDto.name,
                state: Number(taskInDto.state),
            });
        }
        return task;
    }

    public async delete(id: number): Promise<DeleteResult | undefined> {
        const task = await this.taskRepository.findOne(id);
        return task ? await this.taskRepository.delete(id) : undefined;
    }
}