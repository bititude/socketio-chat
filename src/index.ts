import { Server } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { Logger, ChatEmitter } from "./helpers";
import { UserService, MessageService } from "./services";
import {
  User,
  Message,
  IoInitOptions,
  SOCKET_EVENTS,
  IO_EVENTS,
  ChatEmitterEvents,
  Socket,
} from "./types";
const DEFAULT_PORT = 3030;

export class ChatService {
  private io: Server;
  private logger: Logger;
  private userService: UserService;
  private messageService: MessageService;
  private chatEmitter: ChatEmitter;

  /* ***** private methods ***** */
  private async onUserConnect?(user: User): Promise<void>;
  private async onOnlineStatusSend?(connected: boolean): Promise<void>;
  private async onRoomsJoined?(rooms: string[]): Promise<void>;
  private async onMessageRecieved?(message: Message): Promise<void>;
  private async authenticateUser?(auth: any): Promise<User>;
  /* ***** protected methods end ***** */

  constructor(initOptions?: IoInitOptions, log?: boolean) {
    const {
      srv,
      onUserConnect,
      onOnlineStatusSend,
      onRoomsJoined,
      onMessageRecieved,
      authenticateUser,
      ...otherOptions
    } = initOptions || {};

    this.onUserConnect = onUserConnect;
    this.onOnlineStatusSend = onOnlineStatusSend;
    this.onRoomsJoined = onRoomsJoined;
    this.onMessageRecieved = onMessageRecieved;

    this.logger = new Logger({ log });
    this.chatEmitter = new ChatEmitter();
    this.userService = new UserService(this.chatEmitter, log);
    this.messageService = new MessageService(this.chatEmitter, log);

    this.logger.log("Initializing socket");
    const hostServer = srv || DEFAULT_PORT;
    this.io = new Server(hostServer, otherOptions);

    /*  to enable socket admin ui, install package and uncomment below line */
    // instrument(this.io, { auth: false });
    if (authenticateUser) {
      this.authenticateUser = authenticateUser;
      this.logger.log("User Authentication enabled");
      this.io.use(this.useAuthenticator);
    }
    this.initiateEvents();
  }

  /**
   * Authenticator middleware
   */
  private useAuthenticator = async (
    socket: Socket,
    next: (err?: ExtendedError) => void
  ) => {
    const auth = socket.handshake.auth;
    if (!auth) {
      next(new Error("No authentication provided. `handshake.auth` is emply"));
    }
    this.logger.log("Authenticating room...");
    const user = await this.authenticateUser?.(auth);
    if (user) {
      const { userRoomId, friends, groups } = user;
      socket.user = {
        userRoomId,
        friends: friends || [],
        groups: groups || [],
      };
      return next();
    }
    return next(new Error("Unauthorized"));
  };

  /**
   * On a successfull socket connection
   */
  private clientOnConnection = (socket: Socket) => {
    this.logger.log("User connected with socket id::", socket.id);
    const user = socket.user;
    if (user) {
      this.onUserConnect?.(user);
      this.userService.joinSockets(socket);
      this.userService.sendOnlineStatus(socket, true);
    }
    // Register private message events
    socket.on(SOCKET_EVENTS.PVT_MESSAGE, (message: Message) =>
      this.onPrivateMessage(socket, message)
    );
    // Register client disconnection
    socket.on(IO_EVENTS.DISCONNECT, () => this.clientOnDisconnect(socket));
  };

  /**
   * On socket disconnected
   */
  private clientOnDisconnect = async (socket: Socket) => {
    const user = socket.user;
    if (user) {
      const matchingSockets = await this.io.in(user.userRoomId).allSockets();
      console.log({ matchingSockets });

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
    this.io.on(IO_EVENTS.CONNECTION, this.clientOnConnection);
    const events: ChatEmitterEvents = {
      status_send: this.onOnlineStatusSend,
      rooms_joined: this.onRoomsJoined,
    };
    this.chatEmitter.registerEvents(events);
  }
}
