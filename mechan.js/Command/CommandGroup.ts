import {
    Command,
    CommandBuilder,
    CommandHandler,
    PermissionCheck,
    CommandContext
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
        this.handler = handler;
        this.parent = parent;
        this.commands = new Map<string, Command>();
        commands.forEach((v, index, array) => {
            this.commands.set(v.name, v);
        })
        this.name = name;
        this.prechecks = prechecks;
        this.category = category;
        this.visible = visible;
        this.groups = new Map<string, CommandGroup>();
    }

    /**
     * Get an item from the map
     * @param index - Index to start looking at the parts
     * @param parts - Parts of the item
     */
    public getItem(index: number = 0, parts: string[]): CommandGroup {
        if (index != parts.length) {
            let nextPart: string = parts[index];
            let nextGroup = this.groups.get(nextPart.toLowerCase())
            if (nextGroup) {
                return nextGroup.getItem(index + 1, parts);
            } else {
                return null;
            }
        }
        return this;
    }

    /**
     * Get the comamnds in this map
     */
    public getCommands(): Command[] {
        if (Array.from(this.commands.values()).length > 0)
            return Array.from(this.commands.values());
        else if (this.parent != null)
            return this.parent.getCommands();
        else
            return null;
    }

    /**
     * Get commands from the given string
     * @param text
     */
    public getCommandsFromString(text: string): Command[] {
        return this.getCommandsFromIndex(0, text.split(' '));
    }
    /**
     * Get command at index
     * @param index - Index of the command
     * @param parts - Parts of the command
     */
    public getCommandsFromIndex(index: number, parts: string[]): Command[] {
        if (index != parts.length) {
            let nextPart: string = parts[index];
            let nextGroup: CommandGroup;
            try {
                nextGroup = this.groups.get(nextPart.toLowerCase());
                var cmd = nextGroup.getCommandsFromIndex(index + 1, parts);
                if (cmd != null)
                    return cmd;
            } catch (e) { }
        }

        if (this.commands != null)
            return Array.from(this.commands.values());
        return null;
    }

    /**
    * Check if the module can run
    * @param context - Command context
    */
    public canRun(context: CommandContext): [boolean, string] {
        let error: string = null;
        if (Array.from(this.commands.values()).length > 0) {
            for (let cmd of Array.from(this.commands.values())) {
                let [can, err] = cmd.canRun(context);
                error = err;
                if (can)
                    return [true, null];
            }
        }
        if (this.groups.size > 0) {
            for (let item of this.groups) {
                let [can, err] = item[1].canRun(context);
                error = err;
                if (can)
                    return [true, null];
            }
        }
        return [false, error];
    }

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
    constructor(handler: CommandHandler, parent: CommandGroup, name: string = "", category: string = null, prechecks: PermissionCheck[] = []) {
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

    /**
     * Create subGroup
     * @param name - Group name
     */
    public createGroup(name: string, callback?: (builder: CommandGroupBuilder) => void): CommandGroupBuilder {
        let builder = new CommandGroupBuilder(this.handler, this, this.name + ' ' + name, this.category, this.prechecks);
        if (callback)
            callback(builder);
        this.groups.set(name, builder);
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