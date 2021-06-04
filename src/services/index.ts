import ChatListService from "./chat-list.service";
import ChatRoomService from "./chat-room.service";
export * from "./user.service";
export * from "./message.service";

export const chatListService = new ChatListService();
export const chatRoomService = new ChatRoomService();
