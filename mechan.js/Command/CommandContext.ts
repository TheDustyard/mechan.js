import { User, Message } from 'discord.js';
import { 
    Command,
    CommandHandler
} from '../';

export class CommandContext {
    /**
     * User that called the command
     */
    public user: User;
    /**
     * Message that called the command
     */
    public message: Message;
    /**
     * Comamnd that was called
     */
    public command: Command;
    /**
     * Command handler that handled the command
     */
    public handler: CommandHandler;
    /**
     * Command's perameters
     */
    public parameters: string[];

    /**
     * Create a command context
     * @param user - User that called the command
     * @param message - Message that called the command
     * @param command - Comamnd that was called
     * @param handler - Command handler that handled the command
     */
    constructor(user: User, message: Message, command: Command, parameters: string[], handler: CommandHandler) {
        this.user = user;
        this.message = message;
        this.command = command;
        this.handler = handler;
        this.parameters = parameters;
    }
}