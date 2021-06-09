import { ChatEmitter } from "../helpers";
import { Message, Socket } from "../types";
export declare class MessageService {
    private logger;
    private chatEmitter;
    constructor(chatEmitter: ChatEmitter, log?: boolean);
    /**
     * Send a private message
     * @param socket Connected user socket
     * @param to roomId
     */
    sendPrivateMessage(socket: Socket, { content, to }: Partial<Message>): void;
}
//# sourceMappingURL=message.service.d.ts.map