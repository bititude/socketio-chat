import { User, Message, IoInitOptions } from "./types";
export declare class ChatService {
    private io;
    private logger;
    private userService;
    private messageService;
    private chatEmitter;
    protected onUserConnect?(user: User): Promise<void>;
    protected onOnlineStatusSend?(connected: boolean): Promise<void>;
    protected onRoomsJoined?(rooms: string[]): Promise<void>;
    protected onMessageRecieved?(message: Message): Promise<void>;
    protected authenticateUser?(auth: any): Promise<User>;
    constructor(initOptions?: IoInitOptions, log?: boolean);
    /**
     * Authenticator middleware
     */
    private useAuthenticator;
    /**
     * On a successfull socket connection
     */
    private clientOnConnection;
    /**
     * On socket disconnected
     */
    private clientOnDisconnect;
    /**
     * On Private message recieved
     */
    private onPrivateMessage;
    /**
     * On socket server initialization
     */
    private serverOnInit;
    initiateEvents(): void;
}
//# sourceMappingURL=index.d.ts.map