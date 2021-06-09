import EventEmitter from "events";
import { ChatEmitterEvents, ChatEmitterEventKey } from "../types/helpers";

export class ChatEmitter extends EventEmitter {
  /**
   * To register event emitter
   * @param {ChatEmitterEvents} events Chat events that are being registered, accepts type object
   */
  registerEvents(events: ChatEmitterEvents) {
    for (const eventName in events) {
      const listner = events[eventName as ChatEmitterEventKey];
      if (listner) this.on(eventName, listner);
    }
  }
  /**
   * Emit to a registered event.
   * @param {string} eventName registered event name
   * @param {any} data optioanal data passed in an event
   */
  emitEvent(eventName: ChatEmitterEventKey, data?: any) {
    this.emit(eventName, data);
  }
}
