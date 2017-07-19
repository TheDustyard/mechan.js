import { CommandEventArgs } from './CommandEventArgs';
import { CommandParameter } from './Parameters/CommandParameters';
import { PermissionCheck } from './Permissions/PermissionCheck';

export class Command {
    /**
     * Name of the command
     */
    name: string;
    /**
     * Callback for the command
     */
    callback: (event: CommandEventArgs) => void;
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
    constructor(name: string, callback: (event: CommandEventArgs) => void, parameters: CommandParameter[], description: string = '', category: string = '', visible: boolean = true, checks: PermissionCheck[] = []) {
        this.name = name;
        this.callback = callback;
        this.parameters = parameters;
        this.checks = checks;
        this.description = description;
        this.category = category;
        this.visible = visible;
    }
}