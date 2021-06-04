import { Server } from "socket.io";
import { UserService } from "../types/services/user.service";

class ChatUserService implements UserService {
  constructor(io: Server) {}
  userCreated() {}
  userConnected() {
    throw new Error("Method not implemented.");
  }
  userDisconnected() {
    throw new Error("Method not implemented.");
  }
}

export default ChatUserService;
