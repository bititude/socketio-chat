export type ChatEmitterEventKey = "status_send" | "rooms_joined";

export type ChatEmitterEvents = {
  /**
   * Will allow any string from `ChatEmitterEventKey`
   */
  [key in ChatEmitterEventKey]?:
    | ((...args: any[]) => Promise<void> | void)
    | undefined;
};
