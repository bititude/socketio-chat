/// <reference types="node" />
import EventEmitter from "events";
import { ChatEmitterEvents, ChatEmitterEventKey } from "../types/helpers";
export declare class ChatEmitter extends EventEmitter {
    /**
     * To register event emitter
     * @param {ChatEmitterEvents} events Chat events that are being registered, accepts type object
     */
    registerEvents(events: ChatEmitterEvents): void;
    /**
     * Emit to a registered event.
     * @param {string} eventName registered event name
     * @param {any} data optioanal data passed in an event
     */
    emitEvent(eventName: ChatEmitterEventKey, data?: any): void;
}
//# sourceMappingURL=event-listener.d.ts.map