import { LoggerOptions } from "../types";
export declare class Logger {
    private name;
    private isLogging;
    constructor(options: LoggerOptions);
    /**
     * Get Info string that printed on every log
     * @param color color code of log text
     * @returns {string} string that appended with all defaukt infos
     */
    private getInfoLog;
    /**
     * Stringify all messages to be logged.
     * @param messages array of messages of type any
     * @returns stringified messages
     */
    private stringifyMessages;
    /**
     * Prints messages in newline.
     * @param messages {any[]}
     */
    log(...messages: any[]): void;
    /**
     * Prints warning messages in newline.
     * @param messages {any[]}
     */
    warn(...messages: any[]): void;
    /**
     * Prints error messages in newline.
     * @param messages {any[]}
     */
    error(...messages: any[]): void;
}
//# sourceMappingURL=logger.d.ts.map