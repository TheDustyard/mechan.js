export const version: string = require('./package').version;

export * from './Command/Parameters/CommandParameters';
export * from './Command/Parameters/ParameterType';
export * from './Command/Permissions/PermissionCheck';
export * from './Command/Command';
export * from './Command/CommandBuilder';
export * from './Command/CommandGroup';

export * from './CommandHandler/CommandEventArgs';
export * from './CommandHandler/CommandHandler';
export * from './CommandHandler/CommandHandlerConfig';

export * from './Help/HelpMode';