import { EventEmitter } from 'events';

export const version: string = require('../package').version;

//#region Command
export class Command{
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
    constructor(name: string, callback: (event: CommandEvent) => void, parameters: CommandParameter[], description: string, category?: string, visible?: boolean, checks?: PermissionCheck[]) {
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
     * Create a command group
     * @param name - Name of the group
     * @param commands - Subcommands
     */
    constructor(name: string, commands?: Command[]) {
        if (commands === undefined)
            this.commands = [];
        else
            this.commands = commands

        this.name = name
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
    /**
     * Create a command builder
     */
    constructor() {
        super("", () => { }, [], "", null, false, []);
    }

    /**
     * Set the command's name
     * @param name - Name of the command
     */
    setName(name: string) {
        this.name = name;
    }

    /**
     * Set the command's callback
     * @param callback- Callback for the command
     */
    setCallback(callback: (event: CommandEvent) => void) {
        this.callback = callback;
    }

    /**
     * Add a command perameter
     * @param perameter - Perameter to add
     */
    addParameter(parameter: CommandParameter) {
        this.parameters.push(parameter);
    }

    /**
     * Add command perameters
     * @param perameter - Perameters to add
     */
    addParameters(parameters: CommandParameter[]) {
        for (let parameter of parameters)
            this.addParameter(parameter);
    }

    /**
     * Remove a command perameter
     * @param perameter - Perameter to remove
     */
    removeParameter(parameter: CommandParameter) {
        let index = this.parameters.indexOf(parameter);
        delete this.parameters[index];
    }

    /**
     * Remove command perameters
     * @param perameter - Perameters to remove
     */
    removeParameters(parameters: CommandParameter[]) {
        for (let parameter of parameters)
            this.removeParameter(parameter);
    }

    /**
     * Remove all perameters
     */
    clearParameters() {
        this.parameters = [];
    }

    /**
     * Add a permission check
     * @param check - Check to add
     */
    addCheck(check: PermissionCheck) {
        this.checks.push(check);
    }

    /**
     * Add permission checks
     * @param checks - Checks to add
     */
    addChecks(checks: PermissionCheck[]) {
        for (let check of checks)
            this.addCheck(check);
    }

    /**
     * Remove a permission check
     * @param check - Check to remove
     */
    removeCheck(check: PermissionCheck) {
        let index = this.checks.indexOf(check);
        delete this.checks[index];
    }

    /**
     * Remove permission checks
     * @param checks - Checks to remove
     */
    removeChecks(checks: PermissionCheck[]) {
        for (let check of checks)
            this.removeParameter(check);
    }

    /**
     * Remove all checks
     */
    clearChecks() {
        this.checks = [];
    }

    /**
     * Set command's description
     * @param description - Description of the command
     */
    setDescription(description: string) {
        this.description = description;
    }

    /**
     * Set command's Category
     * @param category - Category the command fits into
     */
    setCategory(category: string) {
        this.category = category;
    }

    /**
     * Set the command's visibility
     * @param visible - Whether or not the command is shown in the default help menu
     */
    setVisible(visible: boolean) {
        this.visible = visible;
    }

    /**
     * Toggle the command's visibility
     */
    toggleVisibility() {
        if (this.visible)
            this.visible = false;
        else
            this.visible = true;
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