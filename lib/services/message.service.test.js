"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_service_1 = require("./message.service");
var chatEmitter = jest.fn().mockImplementation(function () { return ({
    emitEvent: jest.fn(),
}); });
var messageService = new message_service_1.MessageService(chatEmitter, false);
describe("MessageService sendPrivateMessage", function () {
    test("should send Private Message", function () {
        var mockedSocketEmit = jest.fn();
        var socket = {
            to: jest.fn().mockReturnThis(),
            emit: mockedSocketEmit,
            user: {
                userRoomId: "room_id",
            },
        };
        messageService.sendPrivateMessage(socket, {
            content: "this is a content",
            to: "hash_id",
        });
        expect(mockedSocketEmit).toBeCalled();
    });
    test("should throw No user found", function () {
        var mockedSocketEmit = jest.fn();
        var socket = {
            to: jest.fn().mockReturnThis(),
            emit: mockedSocketEmit,
        };
        function sendMessage() {
            messageService.sendPrivateMessage(socket, {
                content: "this is a content",
                to: "hash_id",
            });
        }
        expect(sendMessage).toThrowError("No user found");
    });
    test("should throw No content or to", function () {
        var mockedSocketEmit = jest.fn();
        var socket = {
            to: jest.fn().mockReturnThis(),
            emit: mockedSocketEmit,
            user: {
                userRoomId: "room_id",
            },
        };
        function sendMessage() {
            messageService.sendPrivateMessage(socket, {});
        }
        expect(sendMessage).toThrowError("No content or to");
    });
});
//# sourceMappingURL=message.service.test.js.map