"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.ChatService = void 0;
var socket_io_1 = require("socket.io");
var helpers_1 = require("./helpers");
var services_1 = require("./services");
var types_1 = require("./types");
var DEFAULT_PORT = 3030;
var ChatService = /** @class */ (function () {
    /* ***** protected methods end ***** */
    function ChatService(initOptions, log) {
        var _this = this;
        /**
         * Authenticator middleware
         */
        this.useAuthenticator = function (socket, next) { return __awaiter(_this, void 0, void 0, function () {
            var auth, user, userRoomId, friends, groups;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        auth = socket.handshake.auth;
                        if (!auth) {
                            next(new Error("No authentication provided. `handshake.auth` is emply"));
                        }
                        this.logger.log("Authenticating room...");
                        return [4 /*yield*/, ((_a = this.authenticateUser) === null || _a === void 0 ? void 0 : _a.call(this, auth))];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            userRoomId = user.userRoomId, friends = user.friends, groups = user.groups;
                            socket.user = {
                                userRoomId: userRoomId,
                                friends: friends || [],
                                groups: groups || [],
                            };
                            return [2 /*return*/, next()];
                        }
                        return [2 /*return*/, next(new Error("Unauthorized"))];
                }
            });
        }); };
        /**
         * On a successfull socket connection
         */
        this.clientOnConnection = function (socket) {
            var _a;
            _this.logger.log("User connected with socket id::", socket.id);
            var user = socket.user;
            if (user) {
                (_a = _this.onUserConnect) === null || _a === void 0 ? void 0 : _a.call(_this, user);
                _this.userService.joinSockets(socket);
                _this.userService.sendOnlineStatus(socket, true);
            }
            // Register private message events
            socket.on(types_1.SOCKET_EVENTS.PVT_MESSAGE, function (message) {
                return _this.onPrivateMessage(socket, message);
            });
            // Register client disconnection
            socket.on(types_1.IO_EVENTS.DISCONNECT, function () { return _this.clientOnDisconnect(socket); });
        };
        /**
         * On socket disconnected
         */
        this.clientOnDisconnect = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var user, matchingSockets, isDisconnected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = socket.user;
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.io.in(user.userRoomId).allSockets()];
                    case 1:
                        matchingSockets = _a.sent();
                        console.log({ matchingSockets: matchingSockets });
                        isDisconnected = matchingSockets.size === 0;
                        if (isDisconnected) {
                            this.userService.sendOnlineStatus(socket, false);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        /**
         * On Private message recieved
         */
        this.onPrivateMessage = function (socket, message) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.onMessageRecieved) === null || _a === void 0 ? void 0 : _a.call(this, message))];
                    case 1:
                        _b.sent();
                        this.messageService.sendPrivateMessage(socket, message);
                        return [2 /*return*/];
                }
            });
        }); };
        var _a = initOptions || {}, srv = _a.srv, onUserConnect = _a.onUserConnect, onOnlineStatusSend = _a.onOnlineStatusSend, onRoomsJoined = _a.onRoomsJoined, onMessageRecieved = _a.onMessageRecieved, authenticateUser = _a.authenticateUser, otherOptions = __rest(_a, ["srv", "onUserConnect", "onOnlineStatusSend", "onRoomsJoined", "onMessageRecieved", "authenticateUser"]);
        this.onUserConnect = onUserConnect;
        this.onOnlineStatusSend = onOnlineStatusSend;
        this.onRoomsJoined = onRoomsJoined;
        this.onMessageRecieved = onMessageRecieved;
        this.authenticateUser = authenticateUser;
        this.logger = new helpers_1.Logger({ log: log });
        this.chatEmitter = new helpers_1.ChatEmitter();
        this.userService = new services_1.UserService(this.chatEmitter, log);
        this.messageService = new services_1.MessageService(this.chatEmitter, log);
        this.logger.log("Initializing socket");
        var hostServer = srv || DEFAULT_PORT;
        this.io = new socket_io_1.Server(hostServer, otherOptions);
        /*  to enable socket admin ui, install package and uncomment below line */
        // instrument(this.io, { auth: false });
        this.logger.log("User Authentication enabled");
        this.io.use(this.useAuthenticator);
        this.initiateEvents();
    }
    /**
     * On socket server initialization
     */
    ChatService.prototype.serverOnInit = function () {
        this.logger.log("Socket initialized");
    };
    ChatService.prototype.initiateEvents = function () {
        this.serverOnInit();
        this.io.on(types_1.IO_EVENTS.CONNECTION, this.clientOnConnection);
        var events = {
            status_send: this.onOnlineStatusSend,
            rooms_joined: this.onRoomsJoined,
        };
        this.chatEmitter.registerEvents(events);
    };
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=index.js.map