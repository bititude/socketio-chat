export interface LoggerOptions {
  /**
   * Logger log name, will be appended to the log text, default `''`
   */
  name?: string;
  /**
   * Whether log enabled or not, default `true`
   */
  log?: boolean | undefined;
}
