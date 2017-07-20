import { EventEmitter } from 'events';
import { CommandHandlerConfig } from './CommandHandlerConfig';
import { ICommandHandlerEmitter } from '../Emitters/ICommandHandlerEmitter';
import { ILoggerEmitter } from '../Emitters/ILoggerEmitter';

export class CommandHandler extends EventEmitter implements ICommandHandlerEmitter, ILoggerEmitter {

    /*EVENTS:
     * SUCCESS
     * ERROR
     */

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