import { CommandContext } from './CommandContext';

export enum CommandErrorType {
    Exception,
    UnknownCommand,
    BadPermissions,
    BadArgCount,
    InvalidInput
}

export class CommandErrorContext extends CommandContext {
    public readonly errorType: CommandErrorType;
    public readonly error: Error;

    public constructor(errorType: CommandErrorType, baseArgs: CommandContext, e: Error) {
        super(baseArgs.user, baseArgs.message, baseArgs.command, baseArgs.parameters, baseArgs.handler);
        this.error = e;
        this.errorType = errorType;
    }
}