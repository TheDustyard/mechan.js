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
    }

}

export class CommandGroupBuilder extends CommandGroup {

    constructor(handler: CommandHandler, name: string = "", category: string = null, prechecks: PermissionCheck[] = []) {
        super(handler, name, [], prechecks, category, true);
    }

    public setCategory(category: string): this {
        this.category = category;
        return this;
    }

    public addCheck(checker: PermissionCheck): this {
        this.prechecks.push(checker);
        return this;
    }

    public createGroup(cmd: string, prechecks: PermissionCheck[] = null): this {
        let checks = prechecks || [];
        for (let check of this.prechecks)
            checks.push(check);
        this.groups.push(new CommandGroupBuilder(this.handler, this.name + ' ' + cmd, this.category, checks));
        return this;
    }

    public createCommand(cmd: string): CommandBuilder {
        return new CommandBuilder()
            .setName(cmd)
            .setCategory(this.category)
            .addChecks(this.prechecks);
    }
}