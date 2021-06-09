"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = require("./user.service");
var mockedChatEmitter = { emitEvent: jest.fn() };
var messageService = new user_service_1.UserService(mockedChatEmitter, false);
describe("MessageService sendPrivateMessage", function () {
    test("should send Private Message", function () {
        var mockedSocketJoin = jest.fn();
        var socket = {
            join: mockedSocketJoin,
            user: {
                userRoomId: "room_id",
            },
        };
        messageService.joinSockets(socket);
        expect(mockedChatEmitter.emitEvent).toBeCalled();
        expect(mockedSocketJoin).toBeCalled();
    });
});
//# sourceMappingURL=user.service.test.js.map