import EventEmitter from "events";
import {
  ChatEmitterEvents,
  ChatEmitterEventKey,
} from "../types/helpers/event-listener";

class ChatEmitter extends EventEmitter {
  registerEvents(events: ChatEmitterEvents) {
    for (const eventName in events) {
      const listner = events[eventName as ChatEmitterEventKey];
      if (listner) this.on(eventName, listner);
    }
  }
  emitEvent(eventName: ChatEmitterEventKey, data?: any) {
    this.emit(eventName, data);
  }
}
export default ChatEmitter;
