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
            this.console.log(`${context.command.name} executed successfully`);
        },
        failure: (handler: CommandHandler, context: CommandErrorContext) => {
            this.emit('failure', handler, context);
            this.console.error(`${context.command.name} failed execution, caused by: ${CommandErrorType[context.errorType]}`, context.error);
        }
    };

    public config: CommandHandlerConfig;

    public root: CommandGroupBuilder;
    public client: Client;

    constructor(config: CommandHandlerConfig) {
        super();
        this.config = config;
        this.root = new CommandGroupBuilder(this);
    }

    public install(client: Client): Client {
        this.client = client;

        if (this.config.helpMode != HelpMode.Disabled) {
            // ADD HELP COMMAND
        }


        client.on('message', (message) => {
            //console.log(this.root);
        });

        return client;
    }

    public createGroup(cmd: string, config: (CommandGroupBuilder) => void = null): CommandGroupBuilder {
       return this.root.createGroup(cmd, config);
    };

    public createCommand(cmd: string): CommandBuilder {
        return this.root.createCommand(cmd);
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