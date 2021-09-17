/// <reference types="node" />
import { Server as HttpServer } from "http";
import { ServerOptions } from "socket.io";
import { User, Message } from ".";
export interface IoInitOptions extends Partial<ServerOptions> {
    /**
     * Server to be integrated while creating socket server,
     * you can also pass port number, default port `3030`
     */
    srv?: HttpServer | number;
    /**
     * Enable logging, default `true`
     */
    log?: boolean;
    onUserConnect?: (user: User) => Promise<void>;
    onOnlineStatusSend?: (connected: boolean) => Promise<void>;
    onRoomsJoined?: (rooms: string[]) => Promise<void>;
    onMessageRecieved?: (message: Message) => Promise<void>;
    authenticateUser?: (auth: any) => Promise<User>;
}
//# sourceMappingURL=service.d.ts.map