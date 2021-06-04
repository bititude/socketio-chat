/// <reference types="node" />
import { Server as HttpServer } from "http";
import { ServerOptions } from "socket.io";
export interface IoInitOptions extends Partial<ServerOptions> {
    srv?: HttpServer | number;
}
//# sourceMappingURL=service.d.ts.map