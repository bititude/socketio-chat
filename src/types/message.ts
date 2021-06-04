import { RoomId } from "./room";

export interface Message {
  /**
   * Reciever room id
   */
  to: RoomId;
  /**
   * own's room ids to be identified by reciever
   */
  from: RoomId;
  /**
   * message content
   */
  content: any;
}
