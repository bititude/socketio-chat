import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import Logger from "./helpers/logger";
import {
  ChatEmitterEvents,
  IoInitOptions,
  Message,
  Socket,
  User,
  UserAuth,
} from "./types";
import { UserService, MessageService } from "./services";
import ChatEmitter from "./helpers/event-listener";
const DEFAULT_PORT = 3030;

abstract class ChatService {
  private io: Server;
  private logger: Logger;
  private userService: UserService;
  private messageService: MessageService;
  private chatEmitter: ChatEmitter;

  /* ***** protected methods ***** */
  protected async onUserConnect?(): Promise<void>;
  protected async onOnlineStatusSend?(connected: boolean): Promise<void>;
  protected async onRoomsJoined?(rooms: string[]): Promise<void>;
  protected async onMessageRecieved?(message: Message): Promise<void>;
  protected async authenticateUser?(userAuth: UserAuth): Promise<User>;
  /* ***** protected methods end ***** */

  constructor(initOptions?: IoInitOptions, log?: boolean) {
    const { srv, auth: isAuthEnabled, ...otherOptions } = initOptions || {};
    this.logger = new Logger({ log });
    this.chatEmitter = new ChatEmitter();
    this.userService = new UserService(this.chatEmitter, log);
    this.messageService = new MessageService(this.chatEmitter, log);

    this.logger.log("Initializing socket");
    const hostServer = srv || DEFAULT_PORT;
    this.io = new Server(hostServer, otherOptions);
    instrument(this.io, { auth: false });
    if (isAuthEnabled) {
      this.io.use(this.useAuthenticator);
    }
    this.initiateEvents();
  }

  /**
   * Authenticator middleware
   */
  private useAuthenticator = () => {
    this.io.use(async (socket: Socket, next) => {
      const { userRoomId } = socket.handshake.auth;
      if (userRoomId) {
        const user = await this.authenticateUser?.(userRoomId || socket.id);
        if (user) {
          socket.user = user;
          return next();
        }
      }
      return next(new Error("Unauthorized"));
    });
  };

  /**
   * On a successfull socket connection
   */
  private clientOnConnection = (socket: Socket) => {
    this.logger.log("User connected with socket id::", socket.id);
    const user = socket.user;
    if (user) {
      this.userService.joinSockets(socket);
      this.userService.sendOnlineStatus(socket, true);
    }
    // Register private message events
    socket.on("private message", (message: Message) =>
      this.onPrivateMessage(socket, message)
    );
  };

  /**
   * On socket disconnected
   */
  private clientOnDisconnect = async (socket: Socket) => {
    const user = socket.user;
    if (user) {
      const matchingSockets = await this.io.in(user.userRoomId).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        this.userService.sendOnlineStatus(socket, false);
      }
    }
  };

  /**
   * On Private message recieved
   */
  private onPrivateMessage = async (socket: Socket, message: Message) => {
    await this.onMessageRecieved?.(message);
    this.messageService.sendPrivateMessage(socket, message);
  };

  /**
   * On socket server initialization
   */
  private serverOnInit() {
    this.logger.log("Socket initialized");
  }

  initiateEvents() {
    this.serverOnInit();
    this.io.on("disconnect", this.clientOnDisconnect);
    this.io.on("connection", this.clientOnConnection);
    const events: ChatEmitterEvents = {
      status_send: this.onOnlineStatusSend,
      rooms_joined: this.onRoomsJoined,
    };
    this.chatEmitter.registerEvents(events);
  }
}

export default ChatService;

class NewService extends ChatService {
  constructor() {
    super({
      cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"],
        credentials: true,
      },
    });
  }
}

new NewService();
