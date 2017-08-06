import {
    Command,
    CommandBuilder,
    CommandHandler,
    CommandParser,
    PermissionCheck,
    CommandContext
} from '../';

export class CommandGroup {
    /**
     * Name of the group
     */
    public name: string;
    /**
     * Fullname of the group
     */
    public fullname: string;
    /**
     * Handler that handles the command
     */
    public handler: CommandHandler;
    /**
     * Subcommands
     */
    public commands: Map<string, Command>;
    /**
     * Subgroups
     */
    public groups: Map<string, CommandGroup>;
    /**
     * Parent group
     */
    public parent: CommandGroup;
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
     * @param handler - Handler that handles the command
     * @param parent - Parent group
     * @param name - Name of the group
     * @param commands - Subcommands
     * @param prechecks - Checks to preform on all commands
     * @param category - Category the command fits into
     * @param visible - Whether or not the command is visible in the default help menu
     */
    constructor(handler: CommandHandler, parent: CommandGroup, name: string, commands: Command[] = [], prechecks: PermissionCheck[] = [], category: string = null, visible: boolean = true) {
        if (/ /g.test(name))
            throw "Command group name cannot contain a space";
        this.handler = handler;
        this.parent = parent;
        this.commands = new Map<string, Command>();
        commands.forEach((v, index, array) => {
            this.addCommand(v);
        })
        this.name = name;
        this.prechecks = prechecks;
        this.category = category;
        this.visible = visible;
        this.groups = new Map<string, CommandGroup>();
        this.fullname = "";
    }

    private addCommand(command: Command): void {
        command.fullname = CommandParser.appendPrefix(this.fullname, command.name);
        this.commands.set(CommandParser.appendPrefix(this.fullname, command.name), command);
    }

    private addGroup(group: CommandGroup): void {
        group.fullname = CommandParser.appendPrefix(this.fullname, group.name);
        this.groups.set(CommandParser.appendPrefix(this.fullname, group.name), group);
    }

    /**
     * Create a command
     * @param name - Name of the command
     */
    public createCommand(name: string): CommandBuilder {
        let builder = new CommandBuilder(name)
            .setCategory(this.category)
            .addChecks(this.prechecks);
        this.addCommand(builder);
        return builder;
    }

    /**
     * Create a command group
     * @param name - name of the group
     */
    public createGroup(name: string, callback?: (group: CommandGroupBuilder) => void): CommandGroupBuilder {
        let builder = new CommandGroupBuilder(this.handler, this, name, this.category, this.prechecks);
        this.addGroup(builder);
        if (callback)
            callback(builder);
        return builder;
    }

    /**
    * Check if the module can run
    * @param context - Command context
    */
    //public canRun(context: CommandContext): [boolean, string] {
    //    let error: string = null;
    //    if (Array.from(this.commands.values()).length > 0) {
    //        for (let cmd of Array.from(this.commands.values())) {
    //            let [can, err] = cmd.canRun(context);
    //            error = err;
    //            if (can)
    //                return [true, null];
    //        }
    //    }
    //    if (this.groups.size > 0) {
    //        for (let item of this.groups) {
    //            let [can, err] = item[1].canRun(context);
    //            error = err;
    //            if (can)
    //                return [true, null];
    //        }
    //    }
    //    return [false, error];
    //}

}

export class CommandGroupBuilder extends CommandGroup {

    /**
     * Create a group builder
     * @param handler - Command handler to regester to
     * @param parent - Parent group
     * @param name - Name of the group
     * @param category - Category of the group
     * @param prechecks - Prechecks to run
     */
    constructor(handler: CommandHandler, parent: CommandGroup = null, name: string = "", category: string = null, prechecks: PermissionCheck[] = []) {
        super(handler, parent, name, [], prechecks, category, true);
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
}