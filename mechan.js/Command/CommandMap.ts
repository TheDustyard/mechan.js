import {
    Command,
    CommandContext
} from '../';
import { User, TextChannel } from 'discord.js';

export class CommandMap {
    /**
     * Parent map
     */
    private readonly parent: CommandMap;
    /**
     * Name of the map
     */
    public name: string;
    /**
     * Full name of the map
     */
    public fullName: string;

    /**
     * Commands in the map
     */
    public commands: Command[];
    /**
     * Sub maps
     */
    public items: Map<string, CommandMap>;
    /**
     *  If the map is fisible in the help menu
     */
    public isVisible: boolean;
    /**
     * If the map has no aliases
     */
    public hasNonAliases: boolean;
    /**
     * If the map has sub groups
     */
    public hasSubGroups: boolean;
    //public IEnumerable<CommandMap> SubGroups => _items.Values;

    /**
     * Create a map
     * @param parent - Parent map
     * @param name - Name of the map
     * @param fullName - Full name of the map
     */
    public constructor(parent: CommandMap = null, name: string = null, fullName: string = null) {
        this.parent = parent;
        this.name = name;
        this.fullName = fullName;
        this.items = new Map<string, CommandMap>();
        this.commands = [];
        this.isVisible = false;
        this.hasNonAliases = false;
        this.hasSubGroups = false;
    }

    /**
     * Get an item from the map
     * @param index - Item index
     * @param parts - Parts of the item
     */
    public getItem(index: number = 0, parts: string[]): CommandMap {
        if (index != parts.length) {
            let nextPart: string = parts[index];
            let nextGroup = this.items.get(nextPart.toLowerCase())
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
        if (this.commands.length > 0)
            return this.commands;
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
            let nextGroup: CommandMap;
            try {
                nextGroup = this.items.get(nextPart.toLowerCase());
                var cmd = nextGroup.getCommandsFromIndex(index + 1, parts);
                if (cmd != null)
                    return cmd;
            } catch (e) { }
        }

        if (this.commands != null)
            return this.commands;
        return null;
    }
    /**
     * Add a command
     * @param text - Text
     * @param command - Command to add
     * @param isAlias - If it is an alias to another command
     */
    public addCommand(text: string, command: Command, isAlias: boolean): void {
        this.addCommandAtIndex(0, text.split(' '), command, isAlias);
    }
    /**
     * Add a command at the given index
     * @param index - Index for the command
     * @param parts - Parts of the command
     * @param command - Command to add
     * @param isAlias - If it is an alias to another command
     */
    private addCommandAtIndex(index: number, parts: string[], command: Command, isAlias: boolean): void {
        if (command.visible)
            this.isVisible = true;

        if (index != parts.length) {
            let nextGroup: CommandMap;
            let name: string = parts[index].toLowerCase();
            let fullName: string = parts.join(" ");
            nextGroup = this.items.get(name);

            if (!nextGroup) {
                nextGroup = new CommandMap(this, name, fullName);
                this.items.set(name, nextGroup);
                this.hasSubGroups = true;
            };
            nextGroup.addCommandAtIndex(index + 1, parts, command, isAlias);
        }
        else {
            this.commands.push(command);
            if (!isAlias)
                this.hasNonAliases = true;
        }
    }
    /**
     * Check if the module can run
     * @param context - Command context
     */
    public canRun(context: CommandContext): [boolean, string] {
        let error: string = null;
        if (this.commands.length > 0) {
            for (let cmd of this.commands) {
                let [can, err] = cmd.canRun(context);
                error = err;
                if (can)
                    return [true, null];
            }
        }
        if (this.items.size > 0) {
            for (let item of this.items) {
                let [can, err] = item[1].canRun(context);
                error = err;
                if (can)
                    return [true, null];
            }
        }
        return [false, error];
    }
}