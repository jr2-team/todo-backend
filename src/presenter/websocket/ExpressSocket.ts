import { Namespace, Server } from 'socket.io'

export default abstract class ExpressSocket {
    public readonly webSocketNamespace: string
    public readonly namespace: Namespace

    constructor(webSocketNamespace: string, io: Server) {
        this.webSocketNamespace = webSocketNamespace
        this.namespace = io.of(webSocketNamespace)
    }

    public abstract onConnection(): void
}