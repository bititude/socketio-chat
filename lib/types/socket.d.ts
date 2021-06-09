import { User } from ".";
import { Socket as SocketIoSocket } from "socket.io";
export declare enum IO_EVENTS {
    CONNECTION = "connection",
    DISCONNECT = "disconnect"
}
export declare enum SOCKET_EVENTS {
    PVT_MESSAGE = "private_message",
    USER_CONNECTION = "user_connection"
}
export interface Socket extends SocketIoSocket {
    /**
     * socket.io `Socket` type is extended to have user on authentication.
     */
    user?: User;
}
//# sourceMappingURL=socket.d.ts.map