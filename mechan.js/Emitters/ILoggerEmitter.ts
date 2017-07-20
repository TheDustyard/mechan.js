export interface ILoggerEmitter {
    on(event: 'log', listener: (message: string) => void): this;
    on(event: 'debug', listener: (message: string) => void): this;
    on(event: 'warn', listener: (message: string) => void): this;
    on(event: 'error', listener: (message: string) => void): this;
}