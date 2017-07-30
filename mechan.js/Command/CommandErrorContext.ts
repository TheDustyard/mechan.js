import { 
    CommandContext 
} from '../';

export enum CommandErrorType {
    Exception,
    UnknownCommand,
    BadPermissions,
    BadArgCount,
    InvalidInput
}

export class CommandErrorContext extends CommandContext {
    /**
     * Type of error thrown
     */
    public readonly errorType: CommandErrorType;
    /**
     * The thrown error
     */
    public readonly error: Error;

    /**
     * Create an error context
     * @param errorType - type of error
     * @param baseArgs - Command context
     * @param e - Error
     */
    public constructor(errorType: CommandErrorType, baseArgs: CommandContext, e: Error) {
        super(baseArgs.user, baseArgs.message, baseArgs.command, baseArgs.parameters, baseArgs.handler);
        this.error = e;
        this.errorType = errorType;
    }
}