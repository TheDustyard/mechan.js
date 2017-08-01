import {
    Command,
    CommandBuilder,
    CommandHandler,
    PermissionCheck
} from '../';

export class CommandGroup {
    /**
     * Name of the group
     */
    public name: string;
    /**
     * Handler that handles the command
     */
    public handler: CommandHandler;
    /**
     * Subcommands
     */
    public commands: Command[];
    /**
     * Subgroup
     */
    public groups: CommandGroup[];
    /**
     * Checks to preform on all commands
     */
    public prechecks: PermissionCheck[];
    /**
     * Category the command fits into
     */
    public category: string;
    /**
     * Whether or not the command is visible in the default help menu
     */
    public visible: boolean;

    /**
     * Create a command group
     * @param name - Name of the group
     * @param commands - Subcommands
     */
    constructor(handler: CommandHandler, name: string, commands: Command[] = [], prechecks: PermissionCheck[] = [], category: string = null, visible: boolean = true) {
        this.handler = handler;
        this.commands = commands;
        this.name = name;
        this.prechecks = prechecks;
        this.category = category;
        this.visible = visible;
        this.groups = [];
    }

}

export class CommandGroupBuilder extends CommandGroup {

    /**
     * Create a group builder
     * @param handler - Command handler to regester to
     * @param name - Name of the group
     * @param category - Category of the group
     * @param prechecks - Prechecks to run
     */
    constructor(handler: CommandHandler, name: string = "", category: string = null, prechecks: PermissionCheck[] = []) {
        super(handler, name, [], prechecks, category, true);
    }

    /**
     * Set the category of the group
     * @param category - Category the command fits into
     */
    public setCategory(category: string): this {
        this.category = category;
        return this;
    }

    /**
     * Adda a check
     * @param checker - Checks to preform on all commands
     */
    public addCheck(checker: PermissionCheck): this {
        this.prechecks.push(checker);
        return this;
    }

    /**
     * Show the builder
     */
    public show(): this {
        this.visible = true;
        return this;
    }

    /**
     * Hide the builder
     */
    public hide(): this {
        this.visible = false;
        return this;
    }

    /**
     * Create subGroup
     * @param name - Group name
     */
    public createGroup(name: string): CommandGroupBuilder {
        let builder = new CommandGroupBuilder(this.handler, this.name + ' ' + name, this.category, this.prechecks);
        this.groups.push(builder);
        return builder;
    }

    /**
     * Create command for group
     * @param cmd - Command name
     */
    public createCommand(cmd: string): CommandBuilder {
        return new CommandBuilder()
            .setName(cmd)
            .setCategory(this.category)
            .addChecks(this.prechecks);
    }
}