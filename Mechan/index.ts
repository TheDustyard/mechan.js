import { EventEmitter } from 'events';

export const version: string = require('../package').version;

//#region Command
export class Command {
    /**
     * Create a command
     * @param name - Name of the command
     * @param callback - Callback of the command
     * @param parameters - Command parameters
     * @param checks
     * @param description
     * @param category
     * @param hidden
     */
    constructor(name: string, callback: (CommandEvent) => void, parameters: CommandParameter[], checks: PermissionCheck, description: string, category: string, hidden: boolean) {
        throw "NOT IMPLEMENTED"
    }
}

export class CommandEvent {

}

export class CommandHandler extends EventEmitter {

}

export class CommandParameter {

}

export class PermissionCheck {

}
//#endregion