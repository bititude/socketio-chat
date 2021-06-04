import ChatEmitter from "../helpers/event-listener";
import Logger from "../helpers/logger";
import { Message, Socket } from "../types";

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
  async sendPrivateMessage(socket: Socket, message: Message) {
    const user = socket.user;
    if (!user) {
      return;
    }
    socket.to(message.to).emit("private message", message);
    this.logger.log(
      `User ${user.userRoomId} send a message to user ${message.to}`
    );
  }
}
