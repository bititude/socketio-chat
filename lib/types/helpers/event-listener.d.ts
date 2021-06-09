export declare type ChatEmitterEventKey = "status_send" | "rooms_joined";
export declare type ChatEmitterEvents = {
    [key in ChatEmitterEventKey]?: ((...args: any[]) => Promise<void> | void) | undefined;
};
//# sourceMappingURL=event-listener.d.ts.map