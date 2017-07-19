import { User, Message } from 'discord.js';
import { Command } from '../Command/Command';
import { CommandHandler } from '../CommandHandler/CommandHandler';

export class CommandEventArgs {
    /**
     * User that called the command
     */
    user: User;
    /**
     * Message that called the command
     */
    message: Message;
    /**
     * Comamnd that was called
     */
    command: Command;
    /**
     * Command handler that handled the command
     */
    handler: CommandHandler;

    /**
     * Create command event arguments
     * @param user - User that called the command
     * @param message - Message that called the command
     * @param command - Comamnd that was called
     * @param handler - Command handler that handled the command
     */
    constructor(user: User, message: Message, command: Command, handler: CommandHandler) {
        this.user = user;
        this.message = message;
        this.command = command;
        this.handler = handler;
    }
}