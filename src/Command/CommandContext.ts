import {
    User,
    Message,
    TextChannel,
    DMChannel,
    GroupDMChannel,
    Guild,
    GuildMember
} from 'discord.js';
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
     * Member that called the command
     */
    public member: GuildMember;
    /**
     * Message that called the command
     */
    public message: Message;
    /**
     * Content of the message
     */
    public content: string;
    /**
     * Channel that the command was run in
     */
    public channel: TextChannel | DMChannel | GroupDMChannel;
    /**
     * Guild that the command was run in
     */
    public guild: Guild;
    /**
     * Comamnd that was called
     */
    public command: Command;
    /**
     * Command handler that handled the command
     */
    public handler: CommandHandler;
    /**
     * Command's arguments
     * @deprecated
     */
    public args: string[];
    /**
     * Command's parameters
     */
    public params: Map<string, any>;

    /**
     * Create a command context
     * @param message - Message that called the command
     * @param command - Comamnd that was called
     * @param args - Arguments for the command
     * @param params - Command's parameters
     * @param handler - Command handler that handled the command
     */
    constructor(message: Message, command: Command, args: string[], params: Map<string, any>, handler: CommandHandler) {
        this.user = message.author;
        this.member = message.member;
        this.channel = message.channel;
        this.guild = message.guild;
        this.content = message.content;
        this.message = message;
        this.command = command;
        this.handler = handler;
        this.args = args;
        this.params = params;
    }
}