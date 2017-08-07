import {
    HelpMode,
    ParameterType,
    CommandGroup,
    CommandGroupBuilder,
    Command,
    CommandContext,
    CommandParser,
    CommandErrorType,
    CommandErrorContext,
    CommandBuilder,
    CommandParameter
} from '../../';
import { EventEmitter } from 'events';
import {
    Client,
    Message,
    TextChannel,
    User,
    DMChannel,
    GroupDMChannel
} from 'discord.js';

export type CommandHandlerConfig = {
    prefix: string,
    helpMode: HelpMode,
    mentionPrefix: boolean,
    isSelfBot: boolean
};

export class CommandHandler extends EventEmitter /*extends CommandHandlerEvents*/ {
    /**
     * Custom logger
     */
    private console = {
        log: (message: string) => {
            this.emit('debug', message);
        },
        warn: (message: string) => {
            this.emit('warn', message);
        },
        error: (message: string, error?: Error) => {
            this.emit('error', message, error);
        },
        success: (handler: CommandHandler, context: CommandContext) => {
            this.emit('success', handler, context);
            this.console.log(`${context.command.fullname} executed successfully`);
        },
        failure: (handler: CommandHandler, context: CommandErrorContext) => {
            this.emit('failure', handler, context);
            try {
                this.console.error(`${context.command.fullname} failed execution`, context.error);
            } catch (e) {

            }
        }
    };

    /**
     * Handler config
     */
    public config: CommandHandlerConfig;

    /**
     * Root group for the handler
     */
    public root: CommandGroupBuilder;
    /**
     * Client to handle
     */
    public client: Client;

    /**
     * Create a command handler
     * @param config - Configuration for the handler
     */
    constructor(config: CommandHandlerConfig) {
        super();
        this.config = config;
        this.root = new CommandGroupBuilder(this);
    }

    /**
     * Install the handler onto Discord.js
     * @param client - Client to handle
     */
    public install(client: Client): Client {
        this.client = client;

        if (this.config.helpMode != HelpMode.Disabled) {
            // ADD HELP COMMAND
        }

        client.on('message', (message) => {

            if (this.config.isSelfBot && client.user.id != message.author.id)
                return;

            let messagecontent = message.content;

            let prefixed = messagecontent.startsWith(this.config.prefix);
            let mentionprefixed = messagecontent.startsWith(this.client.user.toString());

            if (prefixed || mentionprefixed) {
                if (prefixed) {
                    messagecontent = messagecontent.replace(this.config.prefix, "");
                } else if (mentionprefixed) {
                    messagecontent = messagecontent.replace(this.client.user.toString(), "");
                }

                let parsedcommand = CommandParser.parseCommand(messagecontent, this.root);

                if (!parsedcommand.wasSuccess) {
                    this.console.failure(this, new CommandErrorContext(new Error("Unknow command"), CommandErrorType.UnknownCommand, new CommandContext(message, null, null, this)));
                    return;
                }

                let parsedargs = CommandParser.parseArgs(parsedcommand.args, parsedcommand.command);

                if (parsedargs.error) {
                    this.console.failure(this, new CommandErrorContext(new Error(parsedargs.error), parsedargs.error, new CommandContext(message, parsedcommand.command, null, this)))
                    return;
                }
                

                let context = new CommandContext(message, parsedcommand.command, parsedargs.args, this);

                let canRun = parsedcommand.command.canRun(context);

                if (!canRun.canRun) {
                    this.console.failure(this, new CommandErrorContext(new Error(canRun.message), CommandErrorType.BadPermissions, context));
                    return
                }

                try {
                    parsedcommand.command.callback(context);
                } catch (e) {
                    this.console.failure(this, new CommandErrorContext(e, CommandErrorType.Error, context))
                }
            }

        });

        return client;
    }

    /**
     * Create a command group for the handler
     * @param name - Command group name
     * @param callback - Callback to initialise all the commands in
     */
    public createGroup(name: string, callback: (group: CommandGroupBuilder) => void = null): CommandGroupBuilder {
       return this.root.createGroup(name, callback);
    }

    /**
     * Create a command for the handler
     * @param cmd - Command name
     */
    public createCommand(cmd: string): CommandBuilder {
        return this.root.createCommand(cmd);
    }

    /**
     * Load commands or groups from a file
     * @param filename - File to load from
     */
    private loadFromFile(filename: string): void {
        throw "NOT SUPPORTED";
    }

    /**
     * Load commands or groups from a directory
     * @param dir - Directory to search
     * @param depth - Depth of folders to search in
     */
    private loadFromDirectory(dir: string, depth: number = 1): void {
        throw "NOT SUPPORTED";
    }

}
export interface CommandHandler {
    on(event: string, listener: Function): this;
    on(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    on(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;
    on(event: 'commandLoad', listener: (handler: CommandHandler, command: Command) => void): this;

    on(event: 'debug', listener: (message: string) => void): this;
    on(event: 'warn', listener: (message: string) => void): this;
    on(event: 'error', listener: (message: string, error?: Error) => void): this;


    once(event: string, listener: Function): this;
    once(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    once(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;
    once(event: 'commandLoad', listener: (handler: CommandHandler, command: Command) => void): this;

    once(event: 'debug', listener: (message: string) => void): this;
    once(event: 'warn', listener: (message: string) => void): this;
    once(event: 'error', listener: (message: string, error?: Error) => void): this;


    emit(event: string, ...args: any[]): boolean;
    emit(event: 'failure', handler: CommandHandler, conetxt: CommandErrorContext): boolean;
    emit(event: 'success', handler: CommandHandler, context: CommandContext): boolean;
    emit(event: 'commandLoad', handler: CommandHandler, command: Command): boolean;

    emit(event: 'debug', message: string): boolean;
    emit(event: 'warn', message: string): boolean;
    emit(event: 'error', message: string, error?: Error): boolean;
}