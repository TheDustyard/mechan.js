import { EventEmitter } from 'events';
import { CommandHandlerConfig } from './CommandHandlerConfig';

export class CommandHandler extends EventEmitter {

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