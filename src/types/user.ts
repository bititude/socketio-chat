import { RoomId } from "./room";

export interface User {
  /**
   * Unique room id
   */
  userRoomId: RoomId;
  /**
   * Friends' room ids
   */
  friends?: string[];
  /**
   * Group's room ids
   */
  groups?: string[];
}

export interface UserAuth {
  userRoomId: string;
  token: string;
}
