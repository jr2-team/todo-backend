import { Namespace, Server } from 'socket.io'
import TaskService from '../../domain/service/TaskService'
import ExpressSocketIO from './ExpressSocketIO'

let namespace: Namespace

export default class TaskSocketIO extends ExpressSocketIO {
    constructor(webSocketNamespace: string, io: Server) {
        super(webSocketNamespace, io)
        namespace = this.namespace
    }

    public onConnection = () => {
        this.namespace.removeListener('connection', receiveTasks)
        this.namespace.on('connection', receiveTasks)
    }
}

export const receiveTasks = async () => {
    if (!namespace) throw new Error('WebSocket namespace is not initialized')

    await new TaskService().getAll()
        .then((tasks) => namespace.emit('receiveTasks', tasks))
}