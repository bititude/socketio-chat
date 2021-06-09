import { ChatEmitter, Logger } from "../helpers";
import { Socket, SOCKET_EVENTS } from "../types";

export class UserService {
  private logger: Logger;
  private chatEmitter: ChatEmitter;

  constructor(chatEmitter: ChatEmitter, log?: boolean) {
    this.logger = new Logger({ name: "User", log });
    this.chatEmitter = chatEmitter;
  }
  /**
   * Connect to all groups and private room
   * @param socket Connected user socket
   */
  joinSockets(socket: Socket) {
    const user = socket.user;
    if (!user) {
      throw new Error("No user found");
    }
    const { userRoomId, groups } = user;
    const rooms = [userRoomId, ...(groups || [])];
    socket.join(rooms);
    this.chatEmitter.emitEvent("rooms_joined", rooms);
    this.logger.log(`User ${user.userRoomId} joined rooms`, rooms);
  }
  /**
   * Send online status to all connected friends if no user found broadcast to all
   * @param socket Connected user socket
   */
  sendOnlineStatus(socket: Socket, connected: boolean) {
    const user = socket.user;
    if (!user) {
      throw new Error("No user found");
    }
    const { friends, groups } = user;
    const roomIds = [...(friends || []), ...(groups || [])];
    socket.to(roomIds).emit(SOCKET_EVENTS.USER_CONNECTION, {
      connected,
      user: user.userRoomId,
    });
    this.chatEmitter.emitEvent("status_send", connected);
    this.logger.log(`User ${user.userRoomId} online status send to`, roomIds);
  }
}
