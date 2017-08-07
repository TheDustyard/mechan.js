import {
    CommandContext,
    CommandParameter,
    PermissionCheck,
    ParameterType,
    PermissionCheckResult
} from '../';
import { User, TextChannel } from 'discord.js';

export class Command {
    /**
     * Name of the command
     */
    public name: string;
    /**
     * Fullname of the command
     */
    public fullname: string
    /**
     * Callback for the command
     */
    public callback: (context: CommandContext) => void;
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
     * @param category - Category the command fits into
     * @param hidden - Whether or not the command is visible in the default help menu
     */
    constructor(name: string, callback: (event: CommandContext) => void, parameters: CommandParameter[], description: string = '', category: string = '', visible: boolean = true, checks: PermissionCheck[] = []) {
        if (/ /g.test(name))
            throw "Command name cannot contain a space";
        if (name === "" || name === null || name === undefined)
            throw "Command must have a name";

        this.name = name;
        this.callback = callback;
        this.parameters = parameters;
        this.checks = checks;
        this.description = description;
        this.category = category;
        this.visible = visible;
        this.fullname = "";
    }

    /**
     * Checks all permission checks and verifies if a command can be run
     * @param context - The context for the command
     */
    canRun(context: CommandContext): PermissionCheckResult {
        for (let i: number = 0; i < this.checks.length; i++) {
            let result = this.checks[i](context)
            if (!result.canRun)
                return {
                    canRun: false,
                    message: result.message
                };
        }
        return {
            canRun: true,
            message: null
        };
    }
}

export class CommandBuilder extends Command {
    private paramsClosed: boolean;
    private allowRequiredParameters: boolean;

    /**
     * Create a command builder
     */
    constructor(name: string) {
        super(name, () => { }, [], null, null, true, []);
        this.paramsClosed = false;
        this.allowRequiredParameters = true;
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
    addParameter(name: string, type: ParameterType): this {
        let parameter = new CommandParameter(name, type);
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