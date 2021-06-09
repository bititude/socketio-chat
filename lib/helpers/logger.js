"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var COLOR_CODE;
(function (COLOR_CODE) {
    COLOR_CODE["RESET"] = "\u001B[0m";
    COLOR_CODE["BLACK"] = "\u001B[30m";
    COLOR_CODE["INFO"] = "\u001B[34m";
    COLOR_CODE["INFO_BG"] = "\u001B[44m";
    COLOR_CODE["LOG"] = "\u001B[32m";
    COLOR_CODE["LOG_BG"] = "\u001B[42m";
    COLOR_CODE["ERROR"] = "\u001B[31m";
    COLOR_CODE["ERROR_BG"] = "\u001B[41m";
    COLOR_CODE["WARN"] = "\u001B[33m";
    COLOR_CODE["WARN_BG"] = "\u001B[43m";
})(COLOR_CODE || (COLOR_CODE = {}));
var Logger = /** @class */ (function () {
    function Logger(options) {
        var _this = this;
        this.name = "SocketChat";
        /**
         * Get Info string that printed on every log
         * @param color color code of log text
         * @returns {string} string that appended with all defaukt infos
         */
        this.getInfoLog = function (color) {
            var time = new Date().toLocaleTimeString();
            return (COLOR_CODE.RESET + " " + time + " " +
                ("[" + COLOR_CODE.INFO + _this.name + COLOR_CODE.RESET + "]") +
                ("[" + COLOR_CODE[color] + color + COLOR_CODE.RESET + "]: ") +
                ("" + COLOR_CODE[color]));
        };
        /**
         * Stringify all messages to be logged.
         * @param messages array of messages of type any
         * @returns stringified messages
         */
        this.stringifyMessages = function (messages) {
            return messages.map(function (message) {
                if (typeof message === "object") {
                    return "\n" + JSON.stringify(message, null, 2) + "\n";
                }
                return message;
            });
        };
        var name = options.name, _a = options.log, log = _a === void 0 ? true : _a;
        if (name) {
            this.name += ":" + name;
        }
        this.isLogging = log;
    }
    /**
     * Prints messages in newline.
     * @param messages {any[]}
     */
    Logger.prototype.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (!this.isLogging)
            return;
        console.log.apply(console, __spreadArray(__spreadArray([this.getInfoLog("LOG")], this.stringifyMessages(messages)), [COLOR_CODE.RESET]));
    };
    /**
     * Prints warning messages in newline.
     * @param messages {any[]}
     */
    Logger.prototype.warn = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (!this.isLogging)
            return;
        console.warn.apply(console, __spreadArray(__spreadArray([this.getInfoLog("WARN")], this.stringifyMessages(messages)), [COLOR_CODE.RESET]));
    };
    /**
     * Prints error messages in newline.
     * @param messages {any[]}
     */
    Logger.prototype.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (!this.isLogging)
            return;
        console.error.apply(console, __spreadArray(__spreadArray([this.getInfoLog("ERROR")], this.stringifyMessages(messages)), [COLOR_CODE.RESET]));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map