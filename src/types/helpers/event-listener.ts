export type ChatEmitterEventKey = "status_send" | "rooms_joined";

export type ChatEmitterEvents = {
  [key in ChatEmitterEventKey]?:
    | ((...args: any[]) => Promise<void> | void)
    | undefined;
};
