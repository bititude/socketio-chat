import { Server as HttpServer } from "http";
import { ServerOptions } from "socket.io";

export interface IoInitOptions extends Partial<ServerOptions> {
  /**
   * Server to be integrated while creating socket server,
   * you can also pass port number, default port `3030`
   */
  srv?: HttpServer | number;

  /**
   * Enable logging, default `true`
   */
  log?: boolean;
}
