export const version: string = require('./package').version;

export * from './Command/Handler/CommandHandler';
export * from './Command/Handler/HelpMode';

export * from './Command/Permissions/GenericChecker';

export * from './Command/Command';
export * from './Command/CommandContext';
export * from './Command/CommandErrorContext';
export * from './Command/CommandGroup';
export * from './Command/CommandParameter';
export * from './Command/CommandParser';

export * from './Message/MessageHandler';