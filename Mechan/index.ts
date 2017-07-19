import { EventEmitter } from 'events';
import { User, Channel, Message } from 'discord.js';

export const version: string = require('../package').version;

//#region Command
export class Command {
    /**
     * Name of the command
     */
    name: string;
    /**
     * Callback for the command
     */
    callback: (event: CommandEvent) => void;
    /**
     * Perameters for the command
     */
    parameters: CommandParameter[];
    /**
     * Permission checks to perform
     */
    checks: PermissionCheck[];
    /**
     * Description of the command
     */
    description: string;
    /**
     * Category the command fits into
     */
    category: string;
    /**
     * Whether or not the command is visible in the default help menu
     */
    visible: boolean;
    /**
     * Create a command
     * @param name - Name of the command
     * @param callback - Callback for the command
     * @param parameters - Command parameters
     * @param checks - Permission checks to perform
     * @param description - Description of the command
     * @param category - Category the command fits into
     * @param hidden - Whether or not the command is visible in the default help menu
     */
    constructor(name: string, callback: (event: CommandEvent) => void, parameters: CommandParameter[], description: string = '', category: string = '', visible: boolean = true, checks: PermissionCheck[] = []) {
        this.name = name;
        this.callback = callback;
        this.parameters = parameters;
        this.checks = checks;
        this.description = description;
        this.category = category;
        this.visible = visible;
    }
}

export class CommandGroup {
    /**
     * Name of the group
     */
    name: string;
    /**
     * Subcommands
     */
    commands: Command[];
    /**
     * Category the command fits into
     */
    category: string;
    /**
     * Whether or not the command is visible in the default help menu
     */
    visible: boolean;

    /**
     * Create a command group
     * @param name - Name of the group
     * @param commands - Subcommands
     */
    constructor(name: string, commands: Command[] = [], category: string = '', visible: boolean = true) {
        this.commands = commands;
        this.name = name;
        this.category = category;
        this.visible = visible;
    }

    /**
    * Add a command
    * @param command - Command to add
    */
    addCommand(command: Command) {
        this.commands.push(command);
    }

    /**
     * Add commands
     * @param command - Commands to add
     */
    addCommands(commands: Command[]) {
        for (let command of commands)
            this.addCommand(command);
    }

    /**
     * Remove a command
     * @param command - Command to remove
     */
    removeCommand(command: Command) {
        let index = this.commands.indexOf(command);
        delete this.commands[index];
    }

    /**
     * Remove commands
     * @param command - Commands to remove
     */
    removeCommands(commands: Command[]) {
        for (let command of commands)
            this.removeCommand(command);
    }

    /**
     * Remove all commands
     */
    clearParameters() {
        this.commands = [];
    }

}

export class CommandBuilder extends Command {
    private paramsClosed: boolean;
    private allowRequiredParameters: boolean;

    /**
     * Create a command builder
     */
    constructor() {
        super("", () => { }, [], "", null, false, []);
        this.paramsClosed = false;
        this.allowRequiredParameters = true;
    }

    /**
     * Set the command's name
     * @param name - Name of the command
     */
    setName(name: string): this {
        this.name = name;
        return this;
    }

    /**
     * Set the command's callback
     * @param callback- Callback for the command
     */
    setCallback(callback: (event: CommandEvent) => void): this {
        this.callback = callback;
        return this;
    }

    /**
     * Add a command perameter
     * @param perameter - Perameter to add
     */
    addParameter(parameter: CommandParameter):this {
        if (this.paramsClosed)
            throw "No parameters may be added after a 'Multiple' or 'Unparsed' parameter.";

        if (!this.allowRequiredParameters)
            throw "`Required` parameters may not be added after an optional one";

        this.parameters.push(parameter);

        if (parameter.type === ParameterType.Optional)
            this.allowRequiredParameters = false;

        if (parameter.type == ParameterType.Multiple || parameter.type == ParameterType.Unparsed)
            this.paramsClosed = true;

        return this;
    }

    /**
     * Add command perameters
     * @param perameter - Perameters to add
     */
    addParameters(parameters: CommandParameter[]): this {
        for (let parameter of parameters)
            this.addParameter(parameter);
        return this;
    }

    /**
     * Remove a command perameter
     * @param perameter - Perameter to remove
     */
    removeParameter(parameter: CommandParameter): this {
        let index = this.parameters.indexOf(parameter);
        delete this.parameters[index];
        return this;
    }

    /**
     * Remove command perameters
     * @param perameter - Perameters to remove
     */
    removeParameters(parameters: CommandParameter[]): this {
        for (let parameter of parameters)
            this.removeParameter(parameter);
        return this;
    }

    /**
     * Remove all perameters
     */
    clearParameters(): this {
        this.parameters = [];
        return this;
    }

    /**
     * Add a permission check
     * @param check - Check to add
     */
    addCheck(check: PermissionCheck): this {
        this.checks.push(check);
        return this;
    }

    /**
     * Add permission checks
     * @param checks - Checks to add
     */
    addChecks(checks: PermissionCheck[]): this {
        for (let check of checks)
            this.addCheck(check);
        return this;
    }

    /**
     * Remove a permission check
     * @param check - Check to remove
     */
    removeCheck(check: PermissionCheck): this {
        let index = this.checks.indexOf(check);
        delete this.checks[index];
        return this;
    }

    /**
     * Remove permission checks
     * @param checks - Checks to remove
     */
    removeChecks(checks: PermissionCheck[]): this {
        for (let check of checks)
            this.removeCheck(check);
        return this;
    }

    /**
     * Remove all checks
     */
    clearChecks(): this {
        this.checks = [];
        return this;
    }

    /**
     * Set command's description
     * @param description - Description of the command
     */
    setDescription(description: string): this {
        this.description = description;
        return this;
    }

    /**
     * Set command's Category
     * @param category - Category the command fits into
     */
    setCategory(category: string): this {
        this.category = category;
        return this;
    }

    /**
     * Set the command's visibility
     * @param visible - Whether or not the command is shown in the default help menu
     */
    setVisible(visible: boolean): this {
        this.visible = visible;
        return this;
    }

    /**
     * Toggle the command's visibility
     */
    toggleVisibility(): this {
        if (this.visible)
            this.visible = false;
        else
            this.visible = true;
        return this;
    }

}

export class CommandEvent {
    user: User;
    message: Message;
    command: Command;
}

export class CommandParameter {
    /**
     * Name of the parameter
     */
    name: string;
    /**
     * Type of the parameter
     */
    type: ParameterType;

    /**
     * Create a command parameter
     * @param name
     * @param type
     */
    constructor(name: string, type: ParameterType) {
        this.name = name;
        this.type = type;
    }
}

export enum ParameterType {
    /**
     * Catches a single required parameter.
     */
    Required,
    /**
     * Catches a single optional parameter.
     */
    Optional,
    /**
     * Catches a zero or more optional parameters.
     */
    Multiple,
    /**
     * Catches all remaining text as a single optional parameter.
     */
    Unparsed
}

export class PermissionCheck {
    /**
     * Function to eveluate if a user has the required permissions
     */
    check: (event: CommandEvent) => boolean;

    /**
     * Create a permission check
     * @param check - Function to eveluate if a user has the required permissions
     */
    constructor(check: (event: CommandEvent) => boolean) {
        this.check = check;
    }
}

export enum HelpMode {
    /**
     * Disable the automatic help command.
     */
    Disabled,
    /**
     * Use the automatic help command and respond in the channel the command is used.
     */
    Public,
    /**
     * Use the automatic help command and respond in a private message.
     */
    Private
}

export class CommandHandler extends EventEmitter {

    constructor(prefix: string) {

        super()
    }
}
//#endregion