import {
    HelpMode,
    ParameterType,
    CommandGroupBuilder,
    CommandMap,
    Command,
    CommandContext,
    CommandHandlerConfig,
    CommandParser,
    CommandErrorType,
    CommandErrorContext,
    CommandBuilder,
    CommandParameter
} from '../';
import { EventEmitter } from 'events';
import {
    Client,
    TextChannel,
    User
} from 'discord.js';

export class CommandHandler extends CommandHandlerEvents {

    /**
     * Config for the handler
     */
    public config: CommandHandlerConfig;
    public root: CommandGroupBuilder;
    public client: Client;

    public allCommands: Command[];
    public categories: Map<string, CommandMap>;
    public map: CommandMap; //Command map stores all commands by their input text, used for fast resolving and parsing

    private OnCommand(context: CommandContext): void {
        this.emit('success', [this, context]);
    }
    private OnCommandError(errorType: CommandErrorType, context: CommandContext, ex: Error = null): void {
        this.emit('faulure', [this, new CommandErrorContext(errorType, context, ex)]);
    }

    public constructor(config: CommandHandlerConfig) {
        super();
        this.config = config;
        this.allCommands = [];
        this.map = new CommandMap();
        this.categories = new Map<string, CommandMap>();
        this.root = new CommandGroupBuilder(this);
    }

    public install(client: Client): void {
        this.client = client;

        if (this.config.helpMode != HelpMode.Disabled) {
            this.createCommand("help")
                .addParameter(new CommandParameter("command", ParameterType.Multiple))
                .hide()
                .setDescription("Returns information about commands.")
                .setCallback(async e => {
                    let replyChannel: TextChannel = this.config.helpMode == HelpMode.Public ? e.Channel : await e.User.CreatePMChannel().ConfigureAwait(false);
                    if (e.parameters.length > 0) {
                        var map = this.map.getItem(0, e.));
                        if (map != null)
                            await showCommandHelp(map, e.User, e.Channel, replyChannel).ConfigureAwait(false);
                        else
                            await replyChannel.SendMessage("Unable to display help: Unknown command.").ConfigureAwait(false);
                    }
                    else //Show general help							
                        await showGeneralHelp(e.User, e.Channel, replyChannel).ConfigureAwait(false);
                });
        }

        client.on('message', (message) => {
            if (this.allCommands.length == 0) return;

            if (this.config.selfBot) {
                if (message.author == null || message.author.id != client.user.id) return; // Will only listen to Self
            }
            else if (message.author == null || message.author.id == client.user.id) return; // Normal expected behavior for bots

            let msg: string = message.content;
            if (msg.length == 0) return;

            let cmdMsg: string = null;

            //Check for command char
            if (this.config.prefixChar) {
                if (msg[0] == this.config.prefixChar)
                    cmdMsg = msg.substring(1);
            }

            //Check for mention
            if (cmdMsg == null && this.config.mentionPrefix) {
                let mention: string = client.user.tag;
                if (msg.startsWith(mention) && msg.length > mention.length)
                    cmdMsg = msg.substring(mention.length + 1);
                else {
                    mention = `${client.user.username}`;
                    if (msg.startsWith(mention) && msg.length > mention.length)
                        cmdMsg = msg.substring(mention.length + 1);
                }
            }

            if (cmdMsg == null) return;

            //Parse command
            let [parsed, commands, argPos] = CommandParser.ParseCommand(cmdMsg, this.map);
            if (commands == null) {
                let errorArgs: CommandContext = new CommandContext(message.author, message, null, null, this);
                this.OnCommandError(CommandErrorType.UnknownCommand, errorArgs);
                return;
            } else {
                for (let command of commands) {
                    //Parse arguments
                    let [error, args] = CommandParser.ParseArgs(cmdMsg, argPos, command);
                    if (error != null) {
                        if (error == CommandErrorType.BadArgCount)
                            continue;
                        else {
                            var errorArgs = new CommandContext(message.author, message, null, null, this);
                            this.OnCommandError(error, errorArgs);
                            return;
                        }
                    }

                    var eventArgs = new CommandContext(message.author, message, command, args, this);

                    // Check permissions
                    let [run, errorText] = command.canRun(eventArgs)
                    if (!run) {
                        this.OnCommandError(CommandErrorType.BadPermissions, eventArgs, errorText != null ? new Error(errorText) : null);
                        return;
                    }

                    // Run the command
                    try {
                        this.OnCommand(eventArgs);
                        command.callback(eventArgs);
                    } catch (ex) {
                        this.OnCommandError(CommandErrorType.Exception, eventArgs, ex);
                    }
                    return;
                }
                var errorArgs2 = new CommandContext(message.author, message, null, null, this);
                this.OnCommandError(CommandErrorType.BadArgCount, errorArgs2);
            }
        });
    }

    public showGeneralHelp(context: CommandContext, replyChannel: TextChannel = null): void {
        let output: string = "";
        let isFirstCategory: boolean = true;
        for (let [name, category] of this.categories) {
            let isFirstItem: boolean = true;
            for (let [key, group] of category.items) {
                let error: string;
                if (group.isVisible && (group.hasSubGroups || group.hasNonAliases) && group.canRun(context)) {
                    if (isFirstItem) {
                        isFirstItem = false;
                        //This is called for the first item in each category. If we never get here, we dont bother writing the header for a category type (since it's empty)
                        if (isFirstCategory) {
                            isFirstCategory = false;
                            //Called for the first non-empty category
                            output += 'These are the commands you can use:\n';
                        }
                        else
                            output += '\n';
                        if (name != "") {
                            output += `**${name}**`;
                            output += (": ");
                        }
                    } else
                        output += (", ");

                    output += '`';
                    output += group.name;

                    if (group.hasSubGroups)
                        output += "*";
                    output += '`';
                }
            }
        }

        if (output.length == 0) {
            output += "There are no commands you have permission to run.";
        } else {
            output += "\n\n";

            //TODO: Should prefix be stated in the help message or not?
            /*StringBuilder builder = new StringBuilder();
            if (Config.PrefixChar != null)
            {
                builder.Append('`');
                builder.Append(Config.PrefixChar.Value);
                builder.Append('`');
            }
            if (Config.AllowMentionPrefix)
            {
                if (builder.Length > 0)
                    builder.Append(" or ");
                builder.Append(Client.CurrentUser.Mention);
            }
            if (builder.Length > 0)
                output.AppendLine($"Start your message with {builder.ToString()} to run a command.");*/
            output += ("Run `help <command>` for more information.");
        }

        (replyChannel || context.message.channel).send(output);
    }

    private showCommandHelp(map: CommandMap, context: CommandContext, replyChannel: TextChannel = null): void {
        let output: string = "";

        let cmds: Command[] = map.commands;
        let isFirstCmd: boolean = true;
        let error: string;
        if (cmds.length > 0) {
            for (var cmd of cmds) {
                let [run, err] = cmd.canRun(context);
                error = err;
                if (!run) {
                    //output.AppendLine(error ?? DefaultPermissionError);
                } else {
                    if (isFirstCmd)
                        isFirstCmd = false;
                    else
                        output += "\n";
                    ShowCommandHelpInternal(cmd, context, output);
                }
            }
        } else {
            output += '`';
            output += map.fullName;
            output += "`\n";
        }

        let isFirstSubCmd: boolean = true;
        for (var [keey, subCmd] of Array.from(map.items).filter(([value, map]) => { let [x, y] = map.canRun(context); return x && map.isVisible; })) {
            if (isFirstSubCmd) {
                isFirstSubCmd = false;
                output += "Sub Commands: ";
            }
            else
                output += ", ";
            output += '`';
            output += subCmd.name;
            if (subCmd.items)
                output += "*";
            output += '`';
        }

        if (isFirstCmd && isFirstSubCmd) { //Had no commands and no subcommands
            output = "";
            output += "There are no commands you have permission to run.";
        }

        (replyChannel || context.message.channel).send(output);
    }

    public showCommandHelpPublic(command: Command, context: CommandContext, replyChannel: TextChannel = null): void {
        let output: string = "";
        let [run, error] = command.canRun(context);
        if (!run)
            output += error || "You do not have permission to access this command.";
        else
            ShowCommandHelpInternal(command, context, output);
        (replyChannel || context.message.channel).send(output);
    }

    private showCommandHelpInternal(command: Command, context: CommandContext, output: string): void {
        output += '`';
        output += command.name;
        for (var param of command.parameters) {
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
                    output += " [-]";
                    break;
            }
        }
        output += "`";
        output += `${command.description || "No description."}`;

        if (command.aliases)
            output += "Aliases: `" + command.aliases.join("`, `") + '`');
    }

    public createGroup(cmd: string, config: (CommandGroupBuilder) => void = null): CommandGroupBuilder {
        return this.root.createGroup(cmd, config);
    };

    public createCommand(cmd: string): CommandBuilder {
        return this.root.CreateCommand(cmd);
    }

    public addCommand(command: Command): void {
        this.allCommands.push(command);

        //Get category
        let category: CommandMap;
        let categoryName: string = command.category || "";
        try {
            category = this.categories.get(categoryName)
        } catch (e) {
            category = new CommandMap();
            this.categories.set(categoryName, category);
        }

        //Add main command
        category.addCommand(command.name, command, false);
        this.map.addCommand(command.name, command, false);

        //Add aliases
        for (var alias of command.aliases) {
            category.addCommand(alias, command, true);
            this.map.addCommand(alias, command, true);
        }
    }
}

export declare class CommandHandlerEvents extends EventEmitter {
    on(event: string, listener: Function): this;
    on(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    on(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;

    once(event: string, listener: Function): this;
    once(event: 'failure', listener: (handler: CommandHandler, context: CommandErrorContext) => void): this;
    once(event: 'success', listener: (handler: CommandHandler, context: CommandContext) => void): this;

    emit(event: string, args: any[]): boolean;
    emit(event: 'failure', args: [CommandHandler, CommandErrorContext]): boolean;
    emit(event: 'success', args: [CommandHandler, CommandContext]): boolean;
}