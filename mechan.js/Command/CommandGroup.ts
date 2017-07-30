import {
    Command
} from '../';

export class CommandGroup {
    /**
     * Name of the group
     */
    public name: string;
    /**
     * Subcommands
     */
    public commands: Command[];
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
    constructor(name: string, commands: Command[] = [], category: string = '', visible: boolean = true) {
        this.commands = commands;
        this.name = name;
        this.category = category;
        this.visible = visible;
    }

    /**
    * Add a command
    * @param command - Command to add
    */
    public addCommand(command: Command) {
        this.commands.push(command);
    }

    /**
     * Add commands
     * @param command - Commands to add
     */
    public addCommands(commands: Command[]) {
        for (let command of commands)
            this.addCommand(command);
    }

    /**
     * Remove a command
     * @param command - Command to remove
     */
    public removeCommand(command: Command) {
        let index = this.commands.indexOf(command);
        delete this.commands[index];
    }

    /**
     * Remove commands
     * @param command - Commands to remove
     */
    public removeCommands(commands: Command[]) {
        for (let command of commands)
            this.removeCommand(command);
    }

    /**
     * Remove all commands
     */
    public clearParameters() {
        this.commands = [];
    }

}