import { MessageService } from "./message.service";

const chatEmitter: any = jest.fn().mockImplementation(() => ({
  emitEvent: jest.fn(),
}));
const messageService = new MessageService(chatEmitter, false);

describe("MessageService sendPrivateMessage", () => {
  test("should send Private Message", () => {
    const mockedSocketEmit = jest.fn();
    const socket: any = {
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
  test("should throw No user found", () => {
    const mockedSocketEmit = jest.fn();
    const socket: any = {
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
  test("should throw No content or to", () => {
    const mockedSocketEmit = jest.fn();
    const socket: any = {
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
