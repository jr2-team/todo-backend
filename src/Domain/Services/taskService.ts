import createConnection from '../../Data/Database/dataBase';
import { Task } from '../DbModels/task';
import { ITaskInDto } from '../Dto/taskInDto';

export default class TaskService {
    public async getAll(): Promise<Task[]> {
        return createConnection.then(async (connection) =>
            await connection.getRepository(Task).find(),
        );
    }

    public async create(taskInDto: ITaskInDto): Promise<Task> {
        return createConnection.then(async (connection) => {
            const taskRepository = connection.getRepository(Task);
            const task = await taskRepository.create({
                name: taskInDto.name,
                state: Number(taskInDto.state),
            });
            return await taskRepository.save(task);
        });
    }

    public async update(id: number, taskInDto: ITaskInDto): Promise<Task | undefined> {
        return createConnection.then(async (connection) => {
            const taskRepository = connection.getRepository(Task);
            const task = await taskRepository.findOne(id);
            if (task) {
                await taskRepository.merge(task, {
                    name: taskInDto.name,
                    state: Number(taskInDto.state),
                });
            }
            return task;
        });
    }

    public async delete(id: number): Promise<void> {
        return createConnection.then(async (connection) => {
            const taskRepository = connection.getRepository(Task);
            const task = await taskRepository.findOne(id);
            if (task) {
                await taskRepository.delete(id);
            }
        });
    }
}