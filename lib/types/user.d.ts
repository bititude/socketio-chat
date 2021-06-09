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
    /**
     * Unique room id
     */
    userRoomId: RoomId;
    /**
     * Generated token on authentication
     */
    token: string;
}
//# sourceMappingURL=user.d.ts.map