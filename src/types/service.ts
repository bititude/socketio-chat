import { Server as HttpServer } from "http";
import { ServerOptions } from "socket.io";

export interface IoInitOptions extends Partial<ServerOptions> {
  srv?: HttpServer | number;
  log?: boolean;
  /**
   * enable auth; default `true`
   */
  auth?: boolean;
}
