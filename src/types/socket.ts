import { User } from ".";
import { Socket as SocketIoSocket } from "socket.io";

export interface Socket extends SocketIoSocket {
  user?: User;
}
