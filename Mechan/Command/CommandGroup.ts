import { Command } from './Command';

export class CommandGroup {
    /**
     * Name of the group
     */
    name: string;
    /**
     * Subcommands
     */
    commands: Command[];
    /**
     * Category the command fits into
     */
    category: string;
    /**
     * Whether or not the command is visible in the default help menu
     */
    visible: boolean;

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
    addCommand(command: Command) {
        this.commands.push(command);
    }

    /**
     * Add commands
     * @param command - Commands to add
     */
    addCommands(commands: Command[]) {
        for (let command of commands)
            this.addCommand(command);
    }

    /**
     * Remove a command
     * @param command - Command to remove
     */
    removeCommand(command: Command) {
        let index = this.commands.indexOf(command);
        delete this.commands[index];
    }

    /**
     * Remove commands
     * @param command - Commands to remove
     */
    removeCommands(commands: Command[]) {
        for (let command of commands)
            this.removeCommand(command);
    }

    /**
     * Remove all commands
     */
    clearParameters() {
        this.commands = [];
    }

}