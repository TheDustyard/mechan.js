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

    constructor(config: CommandHandlerConfig) {
        super();

    }

}
export interface CommandHandler {
    on(event: string, listener: Function): this;
    on(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    on(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;

    once(event: string, listener: Function): this;
    once(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    once(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;

    emit(event: string, args: any[]): boolean;
    emit(event: 'failure', args: [CommandHandler, CommandErrorContext]): boolean;
    emit(event: 'success', args: [CommandHandler, CommandContext]): boolean;
}