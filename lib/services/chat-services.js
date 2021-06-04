"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var DEFAULT_PORT = 3030;
var ChatService = /** @class */ (function () {
    function ChatService(initOptions) {
        console.log("Initializing");
        var _a = initOptions || {}, srv = _a.srv, otherOptions = __rest(_a, ["srv"]);
        var hostServer = srv || DEFAULT_PORT;
        this.io = new socket_io_1.Server(hostServer, otherOptions);
        this.initiateEvents();
    }
    ChatService.prototype.clientOnConnect = function () {
        this.io.on("connection", function (socket) {
            console.log("connected", socket.id);
        });
        this.io;
    };
    ChatService.prototype.clientOnDisconnect = function () {
        console.log("disconnected");
    };
    ChatService.prototype.serverOnInit = function () {
        console.log("Initialized");
    };
    ChatService.prototype.initiateEvents = function () {
        this.serverOnInit();
        this.clientOnConnect();
        this.clientOnDisconnect();
    };
    return ChatService;
}());
exports.default = ChatService;
//# sourceMappingURL=chat-services.js.map