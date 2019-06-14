import { DeleteResult, getRepository, Repository } from 'typeorm'
import Task from '../db-model/Task'
import TaskCreateDto from '../dto/TaskCreateDto'

export default class TaskService {
    private readonly taskDbRepository: Repository<Task>

    constructor() {
        this.taskDbRepository = getRepository(Task)
    }

    public async getAll(): Promise<Task[]> {
        return await this.taskDbRepository.find()
    }

    public async getById(id: number): Promise<Task | undefined> {
        return await this.taskDbRepository.findOne(id)
    }

    public async create(taskInDto: TaskCreateDto): Promise<Task> {
        const task = await this.taskDbRepository.create({
            name: taskInDto.name,
            status: Number(taskInDto.status),
        })
        return await this.taskDbRepository.save(task)
    }

    public async update(id: number, taskInDto: TaskCreateDto): Promise<Task | undefined> {
        const task = await this.taskDbRepository.findOne(id)
        if (task) {
            await this.taskDbRepository.merge(task, {
                name: taskInDto.name,
                status: Number(taskInDto.status),
            })
        }
        return task
    }

    public async delete(id: number): Promise<DeleteResult | undefined> {
        const task = await this.taskDbRepository.findOne(id)
        return task ? await this.taskDbRepository.delete(id) : undefined
    }
}