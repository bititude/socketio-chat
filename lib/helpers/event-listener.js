"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEmitter = void 0;
var events_1 = __importDefault(require("events"));
var ChatEmitter = /** @class */ (function (_super) {
    __extends(ChatEmitter, _super);
    function ChatEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * To register event emitter
     * @param {ChatEmitterEvents} events Chat events that are being registered, accepts type object
     */
    ChatEmitter.prototype.registerEvents = function (events) {
        for (var eventName in events) {
            var listner = events[eventName];
            if (listner)
                this.on(eventName, listner);
        }
    };
    /**
     * Emit to a registered event.
     * @param {string} eventName registered event name
     * @param {any} data optioanal data passed in an event
     */
    ChatEmitter.prototype.emitEvent = function (eventName, data) {
        this.emit(eventName, data);
    };
    return ChatEmitter;
}(events_1.default));
exports.ChatEmitter = ChatEmitter;
//# sourceMappingURL=event-listener.js.map