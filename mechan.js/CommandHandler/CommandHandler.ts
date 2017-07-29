import { EventEmitter } from 'events';
import { CommandHandlerConfig } from './CommandHandlerConfig';
import { CommandContext } from '../Command/CommandContext';

export class CommandHandler extends CommandHandlerEvents {

    /**
     * Config for the handler
     */
    public config: CommandHandlerConfig;

    /**
     * Create a command handler
     * @param config - Config for the handler
     */
    constructor(config: CommandHandlerConfig) {
        super();
        this.config = config;
    }

    public handle() {
        this.emit("error", "REEEEEEEEEEEEEEEEEEEEEEEEEE");
    }
}

export declare class CommandHandlerEvents extends EventEmitter{
    on(event: string, listener: Function): this;
    on(event: 'failure', listener: (error: string) => void): this;
    on(event: 'success', listener: (context: CommandContext) => void): this;
    on(event: 'debug', listener: (message: string) => void): this;
    on(event: 'warn', listener: (message: string) => void): this;
    on(event: 'error', listener: (message: string) => void): this;

    once(event: string, listener: Function): this;
    once(event: 'failure', listener: (error: string) => void): this;
    once(event: 'success', listener: (context: CommandContext) => void): this;
    once(event: 'debug', listener: (message: string) => void): this;
    once(event: 'warn', listener: (message: string) => void): this;
    once(event: 'error', listener: (message: string) => void): this;

    emit(event: string, args: any[]): boolean;
    emit(event: 'failure', args: string): boolean;
    emit(event: 'success', args: CommandContext): boolean;
    emit(event: 'debug', args: string): boolean;
    emit(event: 'warn', args: string): boolean;
    emit(event: 'error', args: string): boolean;
}