import { UserService } from "./user.service";

const mockedChatEmitter: any = { emitEvent: jest.fn() };
const messageService = new UserService(mockedChatEmitter, false);

describe("MessageService sendPrivateMessage", () => {
  test("should send Private Message", () => {
    const mockedSocketJoin = jest.fn();
    const socket: any = {
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
