import { EventEmitter } from 'events';

export const version: string = require('../package').version;

//#region Command
export class Command{
    /**
     * Name of the command
     */
    readonly name: string;
    /**
     * Callback for the command
     */
    readonly callback: (event: CommandEvent) => void;
    /**
     * Permission checks to perform
     */
    readonly parameters: CommandParameter[];
    /**
     * Description of the command
     */
    readonly checks: PermissionCheck[];
    /**
     * Description of the command
     */
    readonly description: string;
    /**
     * Cateogory the command first into
     */
    readonly category: string;
    /**
     * Whether or not the command is shown in the default help menu
     */
    readonly hidden: boolean;
    /**
     * Create a command
     * @param name - Name of the command
     * @param callback - Callback of the command
     * @param parameters - Command parameters
     * @param checks - Permission checks to perform
     * @param description - Description of the command
     * @param category - Cateogory the command first into
     * @param hidden - Whether or not the command is shown in the default help menu
     */
    constructor(name: string, callback: (event: CommandEvent) => void, parameters: CommandParameter[], description: string, category?: string, hidden?: boolean, checks?: PermissionCheck[]) {
        this.name = name;
        this.callback = callback;
        this.parameters = parameters;
        this.checks = checks;
        this.description = description;
        this.category = category;
        this.hidden = hidden;
    }
}

export class CommandBuilder extends Command {
    constructor() {
        super("", () => { }, [], "", null, false, []);
    }
}

export class CommandEvent {

}

export class CommandHandler extends EventEmitter {

    constructor(prefix: string) {

        super()
    }
}

export class CommandParameter {

}

export class PermissionCheck {

}
//#endregion