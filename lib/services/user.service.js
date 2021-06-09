"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var helpers_1 = require("../helpers");
var types_1 = require("../types");
var UserService = /** @class */ (function () {
    function UserService(chatEmitter, log) {
        this.logger = new helpers_1.Logger({ name: "User", log: log });
        this.chatEmitter = chatEmitter;
    }
    /**
     * Connect to all groups and private room
     * @param socket Connected user socket
     */
    UserService.prototype.joinSockets = function (socket) {
        var user = socket.user;
        if (!user) {
            throw new Error("No user found");
        }
        var userRoomId = user.userRoomId, groups = user.groups;
        var rooms = __spreadArray([userRoomId], (groups || []));
        socket.join(rooms);
        this.chatEmitter.emitEvent("rooms_joined", rooms);
        this.logger.log("User " + user.userRoomId + " joined rooms", rooms);
    };
    /**
     * Send online status to all connected friends if no user found broadcast to all
     * @param socket Connected user socket
     */
    UserService.prototype.sendOnlineStatus = function (socket, connected) {
        var user = socket.user;
        if (!user) {
            throw new Error("No user found");
        }
        var friends = user.friends, groups = user.groups;
        var roomIds = __spreadArray(__spreadArray([], (friends || [])), (groups || []));
        socket.to(roomIds).emit(types_1.SOCKET_EVENTS.USER_CONNECTION, {
            connected: connected,
            user: user.userRoomId,
        });
        this.chatEmitter.emitEvent("status_send", connected);
        this.logger.log("User " + user.userRoomId + " online status send to", roomIds);
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map