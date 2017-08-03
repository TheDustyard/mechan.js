import {
    HelpMode,
    ParameterType,
    CommandGroupBuilder,
    //CommandMap,
    Command,
    CommandContext,
    //CommandParser,
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

    public config: CommandHandlerConfig;

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

    constructor(config: CommandHandlerConfig) {
        super();
        this.config = config;
    }

    public install(client: Client): Client {

        client.on('message', this.handle);
        this.console.failure(this, new CommandErrorContext(new Error('death'), CommandErrorType.Error, new CommandContext(new Message(null, null, client), new CommandBuilder(), [], this)));

        return client;
    }

    private handle(message: Message) {

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