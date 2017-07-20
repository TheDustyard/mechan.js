import { CommandContext } from '../CommandHandler/CommandContext';

export interface ICommandHandlerEmitter {
    on(event: 'failure', listener: (error: string) => void): this;
    on(event: 'success', listener: (context: CommandContext) => void): this;
}