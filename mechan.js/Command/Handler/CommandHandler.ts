import {
    HelpMode,
    ParameterType,
    CommandGroup,
    CommandGroupBuilder,
    Command,
    CommandContext,
    CommandParser,
    CommandErrorType,
    CommandErrorContext,
    CommandBuilder,
    CommandParameter
} from '../../';
import { EventEmitter } from 'events';
import {
    Client,
    Message,
    TextChannel,
    User,
    DMChannel,
    GroupDMChannel,
    RichEmbed
} from 'discord.js';

export type CommandHandlerConfig = {
    prefix: string,
    helpMode?: HelpMode,
    mentionPrefix?: boolean,
    isSelfBot?: boolean
};

export class CommandHandler extends EventEmitter {
    /**
     * Custom logger
     */
    private console = {
        log: (message: string) => {
            this.emit('debug', message);
        },
        warn: (message: string) => {
            this.emit('warn', message);
        },
        error: (message: string, error?: Error) => {
            this.emit('error', message, error);
        },
        success: (handler: CommandHandler, context: CommandContext) => {
            this.emit('success', handler, context);
            this.console.log(`${context.command.fullname} executed successfully`);
        },
        failure: (handler: CommandHandler, context: CommandErrorContext) => {
            this.emit('failure', handler, context);
            try {
                this.console.error(`${context.command.fullname} failed execution`, context.error);
            } catch (e) {

            }
        }
    };

    /**
     * Handler config
     */
    public config: CommandHandlerConfig;

    /**
     * Root group for the handler
     */
    public root: CommandGroupBuilder;
    /**
     * Client to handle
     */
    public client: Client;

    /**
     * Create a command handler
     * @param config - Configuration for the handler
     */
    constructor(config: CommandHandlerConfig) {
        super();
        this.config = config;
        if (config.helpMode === undefined) {
            this.config.helpMode = HelpMode.Public;
        }
        this.root = new CommandGroupBuilder(this);
    }

    /**
     * Install the handler onto Discord.js
     * @param client - Client to handle
     */
    public install(client: Client): Client {
        this.client = client;

        if (this.config.helpMode != HelpMode.Disabled) {
            if (this.root.commands.has("help"))
                throw "You cannot override the help command unless the help mode is 'disabled'";

            this.createCommand("help")
                .setCategory("Help commands")
                .setDescription("Get info on commands or see a list of commands")
                .addParameter("command", ParameterType.Unparsed)
                .show()
                .setCallback((context) => {
                    if (context.args[0] === "") {
                        let embed = new RichEmbed();
                        embed.setColor((<any>context.message.guild).me.colorRole.color);

                        let categories = new Map<string, string[]>();

                        for (let command of CommandParser.getCommands(context.handler.root)) {
                            if (!command.visible)
                                return;

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

                        switch (this.config.helpMode) {
                            case HelpMode.Private:
                                context.user.send({ embed: embed })
                                    .catch((reason) => context.channel.send("Invalid perms, Cannot send DM to user"));
                                break;
                            case HelpMode.Public:
                                context.channel.send({ embed: embed })
                                break;
                        }
                    } else {
                        let embed = new RichEmbed();
                        if (context.message.guild)
                            embed.setColor((<any>context.message.guild).me.colorRole.color);

                        let commands = CommandParser.getCommands(context.handler.root);
                        commands = commands.filter(x => x.fullname.toLowerCase().includes(context.args[0].toLowerCase()));
                        commands = commands = commands.sort((a, b) => a.fullname.length - b.fullname.length);

                        for (let command of commands) {
                            if (!command.visible)
                                return;

                            let output = "";
                            output += `Parameters: `;

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

                            output += `\nDescription: *${command.description || "No description"}*`;
                            output += `\nCategory: *${command.category}*`;

                            embed.addField(context.handler.config.prefix + command.fullname + ":", output)
                        }

                        if (embed.fields.length === 0) {
                            embed.setTitle(`No command matched the search term "${context.args[0]}"`);
                        }

                        switch (this.config.helpMode) {
                            case HelpMode.Private:
                                context.user.send({ embed: embed })
                                    .catch((reason) => context.channel.send("Invalid perms, Cannot send DM to user"));
                                break;
                            case HelpMode.Public:
                                context.channel.send({ embed: embed })
                                break;
                        }
                    }

                });
        }

        client.on('message', (message) => {

            if (this.config.isSelfBot && client.user.id !== message.author.id)
                return;

            let messagecontent = message.content;

            let prefixed = messagecontent.startsWith(this.config.prefix);
            let mentionprefixed = messagecontent.startsWith(this.client.user.toString());

            if (prefixed || (mentionprefixed && this.config.mentionPrefix)) {
                if (prefixed) {
                    messagecontent = messagecontent.replace(this.config.prefix, "");
                } else if (mentionprefixed) {
                    messagecontent = messagecontent.replace(this.client.user.toString(), "");
                }

                let parsedcommand = CommandParser.parseCommand(messagecontent, this.root);

                if (!parsedcommand.wasSuccess) {
                    this.console.failure(this, new CommandErrorContext(new Error("Unknown command"), CommandErrorType.UnknownCommand, new CommandContext(message, null, null, this)));
                    return;
                }

                let parsedargs = CommandParser.parseArgs(parsedcommand.args, parsedcommand.command);

                if (parsedargs.error) {
                    this.console.failure(this, new CommandErrorContext(new Error(parsedargs.error), parsedargs.error, new CommandContext(message, parsedcommand.command, null, this)))
                    return;
                }

                let context = new CommandContext(message, parsedcommand.command, parsedargs.args, this);

                let canRun = parsedcommand.command.canRun(context);

                if (!canRun.canRun) {
                    this.console.failure(this, new CommandErrorContext(new Error(canRun.message), CommandErrorType.BadPermissions, context));
                    return;
                }

                try {
                    parsedcommand.command.callback(context);
                } catch (e) {
                    this.console.failure(this, new CommandErrorContext(e, CommandErrorType.Error, context));
                }
            }

        });

        return client;
    }

    /**
     * Create a command group for the handler
     * @param name - Command group name
     * @param callback - Callback to initialise all the commands in
     */
    public createGroup(name: string, callback: (group: CommandGroupBuilder) => void = null): CommandGroupBuilder {
        return this.root.createGroup(name, callback);
    }

    /**
     * Create a command for the handler
     * @param cmd - Command name
     */
    public createCommand(cmd: string): CommandBuilder {
        return this.root.createCommand(cmd);
    }

    /**
     * Load commands or groups from a file
     * @param filename - File to load from
     */
    private loadFromFile(filename: string): void {
        throw "NOT SUPPORTED";
    }

    /**
     * Load commands or groups from a directory
     * @param dir - Directory to search
     * @param depth - Depth of folders to search in
     */
    private loadFromDirectory(dir: string, depth: number = 1): void {
        throw "NOT SUPPORTED";
    }

}

export interface CommandHandler {
    on(event: string, listener: Function): this;
    /**
     * Emitted when a command throws an error
     */
    on(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    /**
     * Emitted when a command runs successfully
     */
    on(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;

    /**
     * Emitted when the handler would log to the console
     */
    on(event: 'debug', listener: (message: string) => void): this;
    /**
     * Emitted when the handler would log to the warn console
     */
    on(event: 'warn', listener: (message: string) => void): this;
    /**
     * Emitted when the handler would log to the error console
     */
    on(event: 'error', listener: (message: string, error?: Error) => void): this;


    once(event: string, listener: Function): this;
    once(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    once(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;

    once(event: 'debug', listener: (message: string) => void): this;
    once(event: 'warn', listener: (message: string) => void): this;
    once(event: 'error', listener: (message: string, error?: Error) => void): this;


    emit(event: string, ...args: any[]): boolean;
    emit(event: 'failure', handler: CommandHandler, conetxt: CommandErrorContext): boolean;
    emit(event: 'success', handler: CommandHandler, context: CommandContext): boolean;

    emit(event: 'debug', message: string): boolean;
    emit(event: 'warn', message: string): boolean;
    emit(event: 'error', message: string, error?: Error): boolean;
}