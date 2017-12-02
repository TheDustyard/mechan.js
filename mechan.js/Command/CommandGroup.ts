import {
    Command,
    CommandBuilder,
    CommandHandler,
    CommandParser,
    PermissionCheck,
    CommandContext,
    ParameterType,
    HelpMode
} from '../';
import {
    RichEmbed
} from 'discord.js';

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
     * Category the group fits into
     */
    public category: string;
    /**
     * Description of the category
     */
    public description: string;
    /**
     * Whether or not the command is visible in the default help menu
     */
    public visible: boolean;
    /**
     * Command to fire when called
     */
    public help: (fullname: string) => Command;

    /**
     * Create a command group
     * @param handler - Handler that handles the commands
     * @param parent - Parent group
     * @param name - Name of the group
     * @param commands - Subcommands
     * @param prechecks - Checks to preform on all commands
     * @param description - Description of the Category
     * @param category - Category the command fits into
     * @param visible - Whether or not the command is visible in the default help menu
     */
    constructor(handler: CommandHandler, parent: CommandGroup, name: string, description: string = null, commands: Command[] = [], prechecks: PermissionCheck[] = [], category: string = null, visible: boolean = true) {
        if (/ /g.test(name))
            throw "Command group name cannot contain a space";
        if ((name === "" || name === null || name === undefined) && parent !== null)
            throw "Command group must have a name";
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
        this.description = description;

        this.help = (fullname: string) => new CommandBuilder(this.handler.config.prefix + fullname)
                                                .addParameter('void', ParameterType.Unparsed)
                                                .setCallback((context) => {
                                                    let embed = new RichEmbed();
                                                    let colorRole = (<any>context.message.guild).me.colorRole;
                                                    if (colorRole)
                                                        embed.setColor(colorRole.color);
                            
                                                    let categories = new Map<string, string[]>();
                            
                                                    for (let command of CommandParser.getCommands(this)) {
                                                        if (!command.visible)
                                                            continue;
                            
                                                        let category = command.category || "No category";
                            
                                                        let list = categories.get(category);
                                                        if (list === undefined)
                                                            list = [];
                            
                                                        let output = "";
                                                        output += `${context.handler.config.prefix}**${command.fullname}**`;
                            
                                                        for (let param of command.parameters) {
                                                            switch (param.type) {
                                                                case ParameterType.Required:
                                                                    output += ` <${param.name}>`;
                                                                    break;
                                                                case ParameterType.Optional:
                                                                    output += ` [${param.name}]`;
                                                                    break;
                                                                case ParameterType.Multiple:
                                                                    output += ` [${param.name}...]`;
                                                                    break;
                                                                case ParameterType.Unparsed:
                                                                    output += ` [${param.name}...]`;
                                                                    break;
                                                            }
                                                        }
                            
                                                        output += ` - *${command.description || "No description"}*`;
                            
                                                        list.push(output);
                                                        categories.set(category, list);
                            
                                                    }
                            
                                                    categories = new Map([...categories.entries()].sort(([a, x], [b, y]) => a.localeCompare(b)));
                            
                                                    for (let value of categories) {
                                                        embed.addField(value[0], value[1]);
                                                    }
                            
                                                    switch (handler.config.helpMode) {
                                                        case HelpMode.Private:
                                                            context.user.send({ embed: embed })
                                                                .catch((reason) => context.channel.send("Invalid perms, Cannot send DM to user"));
                                                            break;
                                                        case HelpMode.Public:
                                                            context.channel.send({ embed: embed })
                                                            break;
                                                    }
                                                });
    }

    private addCommand(command: Command): void {
        command.fullname = CommandParser.appendPrefix(this.fullname, command.name);
        if (this.commands.has(command.fullname)) {
            throw `Command ${command.fullname} already exists, cannot be added to group '${this.fullname || "Base group"}'`;
        }
        this.commands.set(command.fullname, command);
    }

    private addGroup(group: CommandGroup): void {
        group.fullname = CommandParser.appendPrefix(this.fullname, group.name);
        if (this.groups.has(group.fullname)) {
            throw `Group ${group.fullname} already exists, cannot be added to group '${this.fullname || "Base group"}'`;
        }
        this.groups.set(group.fullname, group);
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
     * @param name - Name of the group
     * @param callback - Initialisation function
     */
    public createGroup(name: string, callback?: (group: CommandGroupBuilder) => void): CommandGroupBuilder {
        let builder = new CommandGroupBuilder(this.handler, this, name, null, this.category, this.prechecks);
        this.addGroup(builder);
        if (callback)
            callback(builder);
        return builder;
    }

}

export class CommandGroupBuilder extends CommandGroup {

    /**
     * Create a group builder
     * @param handler - Command handler to regester to
     * @param parent - Parent group
     * @param name - Name of the group
     * @param description - Description of the group
     * @param category - Category of the group
     * @param prechecks - Prechecks to run
     */
    constructor(handler: CommandHandler, parent: CommandGroup = null, name: string = "", description: string = null, category: string = null, prechecks: PermissionCheck[] = []) {
        super(handler, parent, name, description, [], prechecks, category, true);
    }

    /** 
     * Set the description of the group
     * @param description - Description of the group
     */
    public setDescription(description: string): this {
        this.description = description;
        return this;
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
     * Add a permission check
     * @param check - Checks to preform on all commands
     */
    public addCheck(check: PermissionCheck): this {
        this.prechecks.push(check);
        return this;
    }

    /**
     * Show the group
     */
    public show(): this {
        this.visible = true;
        return this;
    }

    /**
     * Hide the group
     */
    public hide(): this {
        this.visible = false;
        return this;
    }
}