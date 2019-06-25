import { Namespace, Server } from 'socket.io'
import TaskService from '../../domain/service/TaskService'
import ExpressWebSocket from './ExpressWebSocket'

let namespace: Namespace

export default class TaskWebSocket extends ExpressWebSocket {
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