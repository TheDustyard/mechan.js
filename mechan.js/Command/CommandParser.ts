import {
    CommandGroup,
    Command,
    CommandErrorType,
    CommandParameter,
    ParameterType,
    CommandHandler,
    CommandContext
} from "../";

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
     * create an instance
     * @param error - Error type
     * @param args - Args parsed out
     */
    constructor(error: CommandErrorType, args: string[]) {
        this.error = error;
        this.args = args;
    }

}

export class CommandParser {

    public static parseCommand(input: string, root: CommandGroup): ParsedCommand {

        if (input === "") {
            return new ParsedCommand(false, null, input);
        }

        let commands: Command[] = CommandParser.getCommands(root);
        let command: Command = null;

        // Sort alphabetically
        commands = commands.sort(function (a, b) {
            return a.fullname.localeCompare(b.fullname);
        });

        /// Get commands that match string
        commands = commands.filter((item) => {
            return input.startsWith(item.fullname);
        });
        
        // Sort by length
        commands = commands.sort(function (a, b) {
            return b.fullname.length - a.fullname.length;
        });

        // Break if no command found
        if (commands.length === 0) {
            return new ParsedCommand(false, null, input);
        }

        // Get command that matches for the most characters
        command = commands[0];

        // Break if no command found
        if (!command) {
            return new ParsedCommand(false, null, input);
        }

        return new ParsedCommand(true, command, input.replace(command.fullname, "").trim());
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
    private static IsWhiteSpace(c: string): boolean {
        return c == ' ' || c == '\n' || c == '\r' || c == '\t'
    };

    public static parseArgs(input: string, command: Command): ParsedArgs {
        let args: string[];

        let currentPart: ParserPart = ParserPart.None;
        let startPosition: number = 0;
        let endPosition: number = 0;
        let inputLength: number = input.length;
        let isEscaped: boolean = false;

        let expectedArgs: CommandParameter[] = command.parameters;
        let argList: string[] = [];
        let parameter: CommandParameter = null;

        args = null;

        if (command.parameters.length === 0 && input == "") {
            return new ParsedArgs(null, []);
        }

        //if (input == "")
        //    return new ParsedArgs(CommandErrorType.InvalidInput, null);

        while (endPosition < inputLength) {
            if (startPosition == endPosition && (parameter == null || parameter.type != ParameterType.Multiple)) { //Is first char of a new arg
                if (argList.length >= expectedArgs.length)
                    return new ParsedArgs(CommandErrorType.BadArgCount, null); //Too many args
                parameter = expectedArgs[argList.length];
                if (parameter.type == ParameterType.Unparsed) {
                    argList.push(input.substring(startPosition));
                    break;
                }
            }

            let currentChar: string = input[endPosition++];
            if (isEscaped)
                isEscaped = false;
            else if (currentChar == '\\')
                isEscaped = true;

            let isWhitespace: boolean = CommandParser.IsWhiteSpace(currentChar);
            if (endPosition == startPosition + 1 && isWhitespace) //Has no text yet, and is another whitespace
            {
                startPosition = endPosition;
                continue;
            }
            
            switch (currentPart) {
                case ParserPart.None:
                    if ((!isEscaped && currentChar == '\"')) {
                        currentPart = ParserPart.DoubleQuotedParameter;
                        startPosition = endPosition;
                    }
                    else if ((!isEscaped && currentChar == '\'')) {
                        currentPart = ParserPart.QuotedParameter;
                        startPosition = endPosition;
                    }
                    else if ((!isEscaped && isWhitespace) || endPosition >= inputLength) {
                        let length: number = (isWhitespace ? endPosition - 1 : endPosition) - startPosition;
                        if (length == 0)
                            startPosition = endPosition;
                        else {
                            let temp: string = input.substring(startPosition, length);
                            argList.push(temp);
                            currentPart = ParserPart.None;
                            startPosition = endPosition;
                        }
                    }
                    break;
                case ParserPart.QuotedParameter:
                    if ((!isEscaped && currentChar == '\'')) {
                        let temp: string = input.substring(startPosition, endPosition - 1);
                        argList.push(temp);
                        currentPart = ParserPart.None;
                        startPosition = endPosition;
                    }
                    else if (endPosition >= inputLength)
                        return new ParsedArgs(CommandErrorType.InvalidInput, null);
                    break;
                case ParserPart.DoubleQuotedParameter:
                    if ((!isEscaped && currentChar == '\"')) {
                        let temp: string = input.substring(startPosition, endPosition - 1);
                        argList.push(temp);
                        currentPart = ParserPart.None;
                        startPosition = endPosition;
                    }
                    else if (endPosition >= inputLength)
                        return new ParsedArgs(CommandErrorType.InvalidInput, null);
                    break;
            }
        }

        //Unclosed quotes
        if (currentPart == ParserPart.QuotedParameter || currentPart == ParserPart.DoubleQuotedParameter)
            return new ParsedArgs(CommandErrorType.InvalidInput, null);

        //Too few args
        for (let i: number = argList.length; i < expectedArgs.length; i++) {
            var param = expectedArgs[i];
            switch (param.type) {
                case ParameterType.Required:
                    return new ParsedArgs(CommandErrorType.BadArgCount, null);
                case ParameterType.Optional:
                case ParameterType.Unparsed:
                    argList.push("");
                    break;
            }
        }

        /*if (argList.Count > expectedArgs.Length)
        {
            if (expectedArgs.Length == 0 || expectedArgs[expectedArgs.Length - 1].Type != ParameterType.Multiple)
                return CommandErrorType.BadArgCount;
        }*/

        args = argList;
        return new ParsedArgs(null, args);
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