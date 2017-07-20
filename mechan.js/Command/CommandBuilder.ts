import { Command } from './Command';
import { CommandEventArgs } from '../Command/CommandEventArgs';
import { CommandParameter } from './Parameters/CommandParameters';
import { ParameterType } from './Parameters/ParameterType';
import { PermissionCheck } from './Permissions/PermissionCheck';

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
    setCallback(callback: (event: CommandEventArgs) => void): this {
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