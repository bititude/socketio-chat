import { IoInitOptions, OnConnect, OnDisconnect, OnInit } from "../types";
declare class ChatService implements OnConnect, OnDisconnect, OnInit {
    private io;
    constructor(initOptions?: IoInitOptions);
    clientOnConnect(): void;
    clientOnDisconnect(): void;
    serverOnInit(): void;
    initiateEvents(): void;
}
export default ChatService;
//# sourceMappingURL=chat-services.d.ts.map