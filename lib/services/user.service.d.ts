import { ChatEmitter } from "../helpers";
import { Socket } from "../types";
export declare class UserService {
    private logger;
    private chatEmitter;
    constructor(chatEmitter: ChatEmitter, log?: boolean);
    /**
     * Connect to all groups and private room
     * @param socket Connected user socket
     */
    joinSockets(socket: Socket): void;
    /**
     * Send online status to all connected friends if no user found broadcast to all
     * @param socket Connected user socket
     */
    sendOnlineStatus(socket: Socket, connected: boolean): void;
}
//# sourceMappingURL=user.service.d.ts.map