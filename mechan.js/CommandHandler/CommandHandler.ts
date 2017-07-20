import { EventEmitter } from 'events';
import { CommandHandlerConfig } from './CommandHandlerConfig';

export class CommandHandler extends EventEmitter {

    /*EVENTS:
     * SUCCESS
     * ERROR
     */
    public config: CommandHandlerConfig;

    /**
     * Create a command handler
     * @param config - Config for the handler
     */
    constructor(config: CommandHandlerConfig) {

        super()
    }
}