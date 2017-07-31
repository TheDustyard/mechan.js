import {
    CommandContext,
    CommandParameter,
    PermissionCheck,
    ParameterType
} from '../';
import { User, TextChannel } from 'discord.js';

export class Command {
    /**
     * Name of the command
     */
    public name: string;
    /**
     * Callback for the command
     */
    public callback: (event: CommandContext) => void;
    /**
     * Perameters for the command
     */
    public parameters: CommandParameter[];
    /**
     * Permission checks to perform
     */
    public checks: PermissionCheck[];
    /**
     * Description of the command
     */
    public description: string;
    /**
     * Aliases for the command
     */
    public aliases: string[];
    /**
     * Category the command fits into
     */
    public category: string;
    /**
     * Whether or not the command is visible in the default help menu
     */
    public visible: boolean;
    /**
     * Create a command
     * @param name - Name of the command
     * @param callback - Callback for the command
     * @param parameters - Command parameters
     * @param checks - Permission checks to perform
     * @param description - Description of the command
     * @param aliases - Aliases for the command
     * @param category - Category the command fits into
     * @param hidden - Whether or not the command is visible in the default help menu
     */
    constructor(name: string, callback: (event: CommandContext) => void, parameters: CommandParameter[], description: string = '', category: string = '', aliases: string[], visible: boolean = true, checks: PermissionCheck[] = []) {
        this.name = name;
        this.callback = callback;
        this.parameters = parameters;
        this.checks = checks;
        this.description = description;
        this.aliases = aliases;
        this.category = category;
        this.visible = visible;
    }

    /**
     * Checks all permission checks and verifies if a command can be run
     * @param context - The context for the command
     */
    canRun(context: CommandContext): [boolean, string] {
        for (let i: number = 0; i < this.checks.length; i++) {
            let [can, err] = this.checks[i](context)
            if (!can)
                return [false, err];
        }
        return [true, null];
    }
}

export class CommandBuilder extends Command {
    private paramsClosed: boolean;
    private allowRequiredParameters: boolean;

    /**
     * Create a command builder
     */
    constructor() {
        super("", () => { }, [], "", null, null, true, []);
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
    setCallback(callback: (context: CommandContext) => void): this {
        this.callback = callback;
        return this;
    }

    /**
     * Add a command perameter
     * @param perameter - Perameter to add
     */
    addParameter(parameter: CommandParameter): this {
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
     * Set the command's visibility to true
     */
    show(): this {
        this.visible = true;
        return this;
    }

    /**
     * Set the command's visibility to false
     */
    hide(): this {
        this.visible = false;
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