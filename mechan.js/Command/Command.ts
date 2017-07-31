import {
    CommandContext,
    CommandParameter,
    PermissionCheck
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