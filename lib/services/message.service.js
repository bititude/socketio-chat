"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
var helpers_1 = require("../helpers");
var types_1 = require("../types");
var MessageService = /** @class */ (function () {
    function MessageService(chatEmitter, log) {
        this.logger = new helpers_1.Logger({ name: "User", log: log });
        this.chatEmitter = chatEmitter;
    }
    /**
     * Send a private message
     * @param socket Connected user socket
     * @param to roomId
     */
    MessageService.prototype.sendPrivateMessage = function (socket, _a) {
        var content = _a.content, to = _a.to;
        var user = socket.user;
        if (!user) {
            throw new Error("No user found");
        }
        if (!to || !content) {
            throw new Error("No content or to");
        }
        var from = user.userRoomId;
        socket.to(to).emit(types_1.SOCKET_EVENTS.PVT_MESSAGE, {
            content: content,
            to: to,
            from: from,
        });
        this.logger.log("Message send from room " + from + " send a message to room " + to);
    };
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map