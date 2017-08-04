export const version: string = require('./package').version;

import * as dcord from 'discord.js';
export const Discord = dcord;

export * from './Command/Handler/CommandHandler';
export * from './Command/Handler/HelpMode';

export * from './Command/Permissions/GenericChecker';

export * from './Command/Command';
export * from './Command/CommandContext';
export * from './Command/CommandErrorContext';
export * from './Command/CommandGroup';
export * from './Command/CommandParameter';
export * from './Command/CommandParser';

//export * from './Command/Parameters/CommandParameters';
//export * from './Command/Parameters/ParameterType';

//export * from './Command/Permissions/PermissionCheck';

//export * from './Command/Command';
//export * from './Command/CommandBuilder';
//export * from './Command/CommandContext';
//export * from './Command/CommandErrorContext';
//export * from './Command/CommandGroup';
//export * from './Command/CommandMap';
//export * from './Command/CommandParser';
//export * from './Command/HelpMode';


//export * from './CommandHandler/CommandHandler';
//export * from './CommandHandler/CommandHandlerConfig';