import { LoggerOptions } from "../types";

enum COLOR_CODE {
  RESET = "\x1b[0m", // default
  BLACK = "\x1b[30m", // black
  INFO = "\x1b[34m", // blue
  INFO_BG = "\x1b[44m",
  LOG = "\x1b[32m", // green
  LOG_BG = "\x1b[42m",
  ERROR = "\x1b[31m", // red
  ERROR_BG = "\x1b[41m",
  WARN = "\x1b[33m", // yellow
  WARN_BG = "\x1b[43m",
}

class Logger {
  private name = "SocketChat";
  private isLogging: boolean;
  constructor(options: LoggerOptions) {
    const { name, log = true } = options;
    if (name) {
      this.name += `:${name}`;
    }
    this.isLogging = log;
  }

  private getInfoLog = (color: keyof typeof COLOR_CODE) => {
    const time = new Date().toLocaleTimeString();
    return (
      `${COLOR_CODE.RESET} ${time} ` +
      `[${COLOR_CODE.INFO}${this.name}${COLOR_CODE.RESET}]` +
      `[${COLOR_CODE[color]}${color}${COLOR_CODE.RESET}]: ` +
      `${COLOR_CODE[color]}`
    );
  };

  private stringifyMessages = (messages: any[]) =>
    messages.map((message) => {
      if (typeof message === "object") {
        return `\n${JSON.stringify(message, null, 2)}\n`;
      }
      return message;
    });

  /**
   * Prints messages in newline.
   * @param messages {any[]}
   */
  log(...messages: any[]) {
    if (!this.isLogging) return;
    console.log(
      this.getInfoLog("LOG"),
      ...this.stringifyMessages(messages),
      COLOR_CODE.RESET
    );
  }
  /**
   * Prints warning messages in newline.
   * @param messages {any[]}
   */
  warn(...messages: any[]) {
    if (!this.isLogging) return;
    console.warn(
      this.getInfoLog("WARN"),
      ...this.stringifyMessages(messages),
      COLOR_CODE.RESET
    );
  }
  /**
   * Prints error messages in newline.
   * @param messages {any[]}
   */
  error(...messages: any[]) {
    if (!this.isLogging) return;
    console.error(
      this.getInfoLog("ERROR"),
      ...this.stringifyMessages(messages),
      COLOR_CODE.RESET
    );
  }
}
export default Logger;
