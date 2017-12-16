import {
    CommandGroup,
    Command,
    CommandErrorType,
    CommandParameter,
    ParameterType,
    CommandHandler,
    CommandContext
} from "../index";

enum ParserPart {
    None = "none",
    Parameter = "parameter",
    QuotedParameter = "qoutedParameter",
    DoubleQuotedParameter = "doubleQoutedParameter"
};

export class ParsedCommand {
    /**
     * If the command parsing succeeded
     */
    wasSuccess: boolean;
    /**
     * Commands parsed out
     */
    command: Command;
    /**
     * Arguments string
     */
    args: string;

    /**
     * Create an instance
     * @param wasSuccess - If the command parsing succeeded
     * @param commands - Commands parsed out
     * @param endPos - End position
     */
    constructor(wasSuccess: boolean, command: Command, args: string) {
        this.wasSuccess = wasSuccess;
        this.command = command;
        this.args = args;
    }
};

export class ParsedArgs {
    /**
     * Error type
     */
    error: CommandErrorType;
    /**
     * Args parsed out
     */
    args: string[];
    /**
     * Parameters parsed out
     */
    parameters: Map<string, any>;

    /**
     * create an instance
     * @param error - Error type
     * @param args - Args parsed out
     * @param parameters - Parameters parsed out
     */
    constructor(error: CommandErrorType, args: string[], parameters: Map<string, any>) {
        this.error = error;
        this.args = args;
        this.parameters = parameters;
    }

}

export class CommandParser {

    public static parseCommand(input: string, root: CommandGroup): ParsedCommand {

        if (input === "") {
            return new ParsedCommand(false, null, input);
        }

        //#region COMMAND
        let commands: Command[] = CommandParser.getCommands(root);
        let command: Command;

        // Sort alphabetically
        commands = commands.sort((a, b) => {
            return a.fullname.localeCompare(b.fullname);
        });

        /// Get commands that match string
        commands = commands.filter((item) => {
            if (input.length > item.fullname.length)
                return input.toLowerCase().startsWith(item.fullname.toLowerCase() + " ");
            else
                return input.toLowerCase().startsWith(item.fullname.toLowerCase());
        });

        // Break if no command found
        if (commands.length !== 0) {
            // Sort by length
            commands = commands.sort(function (a, b) {
                return b.fullname.length - a.fullname.length;
            });
            
            // Get command that matches for the most characters
            command = commands[0];

            // Return if command found
            if (command) {
                return new ParsedCommand(true, command, input.replace(command.fullname, "").trim());
            }
        }
        //#endregion

        let groups: CommandGroup[] = CommandParser.getGroups(root);
        let group: CommandGroup;

        // Sort alphabetically
        groups = groups.sort((a, b) => {
            return a.fullname.localeCompare(b.fullname);
        });

        /// Get commands that match string
        groups = groups.filter((item) => {
            if (input.length > item.fullname.length)
                return input.toLowerCase().startsWith(item.fullname.toLowerCase() + " ");
            else
                return input.toLowerCase().startsWith(item.fullname.toLowerCase());
        });

        // Break if no command found
        if (groups.length !== 0) {
            // Sort by length
            groups = groups.sort(function (a, b) {
                return b.fullname.length - a.fullname.length;
            });
            
            // Get command that matches for the most characters
            group = groups[0];


            // Return if command found
            if (group) {
                return new ParsedCommand(true, group.help(group.fullname), input.replace(group.fullname, "").trim());
            }
        }

        return new ParsedCommand(false, null, input);
        

    }

    public static getCommands(commandgroup: CommandGroup): Command[] {
        let commands: Command[] = [];
        for (let command of commandgroup.commands.values()) {
            commands.push(command);
        }
        for (let group of commandgroup.groups.values()) {
            this.getCommands(group).forEach((value: Command, index: number, array: Command[]) => {
                commands.push(value);
            });
        }
        return commands;
    }

    public static getGroups(commandgroup: CommandGroup): CommandGroup[] {
        let groups: CommandGroup[] = [];
        for (let group of commandgroup.groups.values()) {
            groups.push(group);
        }
        for (let group of commandgroup.groups.values()) {
            this.getGroups(group).forEach((value) => {
                groups.push(value);
            });
        }
        return groups;
    }

    /**
     * Check if c is whitespace
     * @param c - Character to check
     */
    private static isWhiteSpace(c: string): boolean {
        return /\s/.test(c);
    };

    public static parseArgs(input: string, command: Command): ParsedArgs {
        let args: Map<string, any> = new Map<string, any>();

        let currentpart: ParserPart = ParserPart.None;
        let startPosition: number = 0;
        let endPosition: number = 0;
        let inputlength: number = input.length;
        let escaped: boolean = false;

        let currentchar;

        let expectedparameters: CommandParameter[] = command.parameters;
        let currentparameter: CommandParameter = expectedparameters[0];

        if (command.parameters.length === 0 && input.trim().length === 0)
            return new ParsedArgs(null, Array.from(args.values()), args);
        
        // if (command.parameters.length > 0 && input.trim().length === 0)
        //     return new ParsedArgs(CommandErrorType.BadArgCount, Array.from(args.values()), args);

        while (endPosition < inputlength) {

            // console.log('-----------')
            // console.log('args:', args);
            // console.log('currentpart:', currentpart);
            // console.log('startPosition:', startPosition);
            // console.log('endPosition:', endPosition);
            // console.log('inputlength:', inputlength);
            // console.log('escaped:', escaped);
            // console.log('currentchar:', currentchar);
            // console.log('expectedparameters:', expectedparameters);
            // console.log('currentparameter:', currentparameter);

            if (currentparameter.type === ParameterType.Multiple) {
                currentparameter = expectedparameters[expectedparameters.length - 1];
            } else {
                currentparameter = expectedparameters[args.size];                
            }

            if (!currentparameter)
                return new ParsedArgs(CommandErrorType.BadArgCount, Array.from(args.values()), args);

            if (currentparameter.type === ParameterType.Multiple) {
                //console.log(`${currentpart}: MULTIPLE`)
            }
            if (currentparameter.type === ParameterType.Unparsed) {
                endPosition = inputlength;
                args.set(currentparameter.name, input.substring(startPosition, endPosition));                
                break;
            }

            currentchar = input[endPosition];
            //console.log(currentchar, currentpart);

            // Charecter is a \, therefore escaping the next char
            if (currentchar === "\\") {
                // Tell the parser the current char is escaped
                escaped = true;

                // Move on
                endPosition ++;
                if (currentpart === ParserPart.None)
                    startPosition ++;

                currentchar = input[endPosition];

                //console.log(`Escaped '${currentchar}'`, startPosition, endPosition);             
            } else {
                // Tell the parser the current char is not escaped
                escaped = false;
            }

            // The current char is whitespace and the parser is not in a part
            if (currentpart === ParserPart.None && CommandParser.isWhiteSpace(currentchar)) {
                // Move on
                startPosition ++;
                endPosition ++;

                //console.log('Skipped whitespace', startPosition, endPosition);
                
                // Run full check on next char
                continue;
            }

            // START OF SINGLE QOUTE
            // The current char is a single qoute and the parser is not in a part
            if (currentpart === ParserPart.None && currentchar === '\'' && !escaped) {
                // Set the current part
                currentpart = ParserPart.QuotedParameter;

                // e x p a n d
                endPosition ++;
                startPosition ++;
 
                //console.log('Captured single qoute', startPosition, endPosition)

                 // Run full check on next char
                 continue;
                
            }

            // MIDDLE OF SINGLE QOUTE
            // The current part is single qouted and the current char is not a single qoute
            if (currentpart === ParserPart.QuotedParameter && ((currentchar === '\'' && escaped) || currentchar !== '\'')) {

                // e x p a n d
                endPosition ++;

                //console.log('Expanded single qoute', startPosition, endPosition);

                // Run full check on next char
                continue;
            }

            // END OF SINGLE QOUTE
            // The current char is a single qoute and the parser is in a single qouted part
            if (currentpart === ParserPart.QuotedParameter && currentchar === '\'' && !escaped) {
                // Set the current part
                currentpart = ParserPart.None;
                
                // Add argument
                if (currentparameter.type === ParameterType.Multiple) {
                    let current = args.get(currentparameter.name);
                    if (!current) {
                        current = [];
                    }
                    
                    if (current instanceof Array)
                        current.push(input.substring(startPosition, endPosition));
    
                    args.set(currentparameter.name, current);
                } else {
                    args.set(currentparameter.name, input.substring(startPosition, endPosition));
                }

                // Continue
                endPosition ++;
                // Catch up
                startPosition = endPosition;

                //console.log('Ended single qoute', startPosition, endPosition);

                // Run full check on next char
                continue;
            }

            // START OF DOUBLE QOUTE
            // The current char is a double qoute and the parser is not in a part
            if (currentpart === ParserPart.None && currentchar === '\"' && !escaped) {

                // Set the currentpart
                currentpart = ParserPart.DoubleQuotedParameter;

                // e x p a n d
                endPosition ++;
                startPosition ++;                

                //console.log('Captured double qoute', startPosition, endPosition);

                // Run full check on next char
                continue;
            }

            // MIDDLE OF DOUBLE QOUTE
            // The current part is double qouted and the current char is not a double qoute
            if (currentpart === ParserPart.DoubleQuotedParameter && ((currentchar === '\"' && escaped) || currentchar !== '\"')) {

                // e x p a n d
                endPosition ++;

                //console.log('Expanded double qoute', startPosition, endPosition);

                // Run full check on next char
                continue;
            }

            // END OF DOUBLE QOUTE
            // The current char is a double qoute and the parser is in a double qouted part
            if (currentpart === ParserPart.DoubleQuotedParameter && currentchar === '\"' && !escaped) {
                // Set the current part
                currentpart = ParserPart.None;

                // Add argument
                if (currentparameter.type === ParameterType.Multiple) {
                    let current = args.get(currentparameter.name);
                    if (!current) {
                        current = [];
                    }
                    
                    if (current instanceof Array)
                        current.push(input.substring(startPosition, endPosition));
    
                    args.set(currentparameter.name, current);
                } else {
                    args.set(currentparameter.name, input.substring(startPosition, endPosition));
                }
                
                // Continue
                endPosition ++;
                // Catch up
                startPosition = endPosition;

                //console.log('Ended double qoute', startPosition, endPosition);

                // Run full check on next char
                continue;
            }

            // START OF PARAMETER
            // The current char is not whitespace and the parser is not in a part
            if (currentpart === ParserPart.None && !CommandParser.isWhiteSpace(currentchar)) {
                // Set current part
                currentpart = ParserPart.Parameter;

                // e x p a n d
                endPosition ++;

                //console.log('Captured parameter', startPosition, endPosition);

                // Run full check on next char
                continue;
            }

            // MIDDLE OF PARAMETER
            // The current char is not unescaped whitespace and the parser is in a unqouted part
            if ((currentpart === ParserPart.Parameter && !CommandParser.isWhiteSpace(currentchar))
            || (currentpart === ParserPart.Parameter && CommandParser.isWhiteSpace(currentchar) && escaped)) {
                // e x p a n d
                endPosition ++;

                //console.log('Expanded parameter', startPosition, endPosition);

                // Run full check on next char
                continue;
            }

            // END OF PARAMETER
            // The current char is whitespace and the parser is in a unqouted part
            if (currentpart === ParserPart.Parameter && CommandParser.isWhiteSpace(currentchar) && !escaped) {
                // Set current part
                currentpart = ParserPart.None;

                // Add argument
                if (currentparameter.type === ParameterType.Multiple) {
                    let current = args.get(currentparameter.name);
                    if (!current) {
                        current = [];
                    }
                    
                    if (current instanceof Array)
                        current.push(input.substring(startPosition, endPosition));
    
                    args.set(currentparameter.name, current);
                } else {
                    args.set(currentparameter.name, input.substring(startPosition, endPosition));
                }

                // Continue
                endPosition ++;
                // Catch up
                startPosition = endPosition;

                //console.log('Ended parameter', startPosition, endPosition);

                // Run full check on next char
                continue;
            }


            // Somehow the start of the arg is before the end, kill the process, something went really wrong
            if (startPosition > endPosition) {
                console.error(`COMMAND PARSER FAILED CATASTROPHICALLY, DUMPING INFO:`)
                console.log('-----------')
                console.log('args:', args);
                console.log('currentpart:', currentpart);
                console.log('startPosition:', startPosition);
                console.log('endPosition:', endPosition);
                console.log('inputlength:', inputlength);
                console.log('escaped:', escaped);
                console.log('currentchar:', currentchar);
                console.log('expectedparameters:', expectedparameters);
                console.log('currentparameter:', currentparameter);
                return new ParsedArgs(CommandErrorType.Catastrophe, Array.from(args.values()), args);
            }
        }

        // END OF PARAMETER
        if (currentpart === ParserPart.Parameter) {
            // Set current part
            currentpart = ParserPart.None;

            // Add argument
            if (currentparameter.type === ParameterType.Multiple) {
                let current = args.get(currentparameter.name);
                if (!current) {
                    current = [];
                }
                
                if (current instanceof Array)
                    current.push(input.substring(startPosition, endPosition));

                args.set(currentparameter.name, current);
            } else {
                args.set(currentparameter.name, input.substring(startPosition, endPosition));
            }

            // Continue
            endPosition ++;
            // Catch up
            startPosition = endPosition;

            //console.log('Ended parameter', startPosition, endPosition);
        }


        // console.log('------DONE-----')
        // console.log('args:', args);
        // console.log('currentpart:', currentpart);
        // console.log('startPosition:', startPosition);
        // console.log('endPosition:', endPosition);
        // console.log('inputlength:', inputlength);
        // console.log('escaped:', escaped);
        // console.log('currentchar:', currentchar);
        // console.log('expectedparameters:', expectedparameters);
        // console.log('currentparameter:', currentparameter);

        if (args.size < expectedparameters.filter(x => x.type === ParameterType.Required).length)
            return new ParsedArgs(CommandErrorType.BadArgCount, Array.from(args.values()), args);

        // console.log(args);

        return new ParsedArgs(null, Array.from(args.values()), args);
    }

    static appendPrefix(prefix: string, cmd: string): string {
        if (cmd != "") {
            if (prefix != "")
                return prefix + ' ' + cmd;
            else
                return cmd;
        }
        else
            return prefix;
    }
}