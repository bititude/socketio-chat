import { ChatEmitter, Logger } from "../helpers";
import { Message, Socket, SOCKET_EVENTS } from "../types";

export class MessageService {
  private logger: Logger;
  private chatEmitter: ChatEmitter;
  constructor(chatEmitter: ChatEmitter, log?: boolean) {
    this.logger = new Logger({ name: "User", log });
    this.chatEmitter = chatEmitter;
  }
  /**
   * Send a private message
   * @param socket Connected user socket
   * @param to roomId
   */
  sendPrivateMessage(socket: Socket, { content, to }: Partial<Message>) {
    const user = socket.user;
    if (!user) {
      throw new Error("No user found");
    }
    if (!to || !content) {
      throw new Error("No content or to");
    }
    const from = user.userRoomId;
    socket.to(to).emit(SOCKET_EVENTS.MESSAGE, {
      content,
      to,
      from,
    });
    this.logger.log(
      `Message send from room ${from} send a message to room ${to}`
    );
  }
}
