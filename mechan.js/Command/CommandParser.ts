import {
    CommandGroup,
    Command,
    CommandErrorType,
    CommandParameter,
    ParameterType
} from "../";

enum ParserPart {
    None = "none",
    Parameter = "parameter",
    QuotedParameter = "qoutedParameter",
    DoubleQuotedParameter = "doubleQoutedParameter"
};

export class ParsedCommandInfo {
    /**
     * If the command parsing succeeded
     */
    wasSuccess: boolean;
    /**
     * Commands parsed out
     */
    commands: Command[];
    /**
     * End position
     */
    endPos: number;

    /**
     * Create an instance
     * @param wasSuccess - If the command parsing succeeded
     * @param commands - Commands parsed out
     * @param endPos - End position
     */
    constructor(wasSuccess: boolean, commands: Command[], endPos: number) {
        this.wasSuccess = wasSuccess;
        this.commands = commands;
        this.endPos = endPos;
    }
};

export class ParsedArgsInfo {
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

    public static ParseCommand(input: string, group: CommandGroup): ParsedCommandInfo {
        let startPosition: number = 0;
        let endPosition: number = 0;
        let inputLength: number = input.length;
        let isEscaped: boolean = false;
        let commands: Command[] = null;
        let endPos: number = 0;

        if (input == "")
            return new ParsedCommandInfo(false, commands, endPos);

        while (endPosition < inputLength) {
            let currentChar: string = input[endPosition++];
            if (isEscaped)
                isEscaped = false;
            else if (currentChar == '\\')
                isEscaped = true;
            let isWhitespace: boolean = CommandParser.IsWhiteSpace(currentChar);

            if ((!isEscaped && isWhitespace) || endPosition >= inputLength) {
                let length: number = (isWhitespace ? endPosition - 1 : endPosition) - startPosition;
                let temp: string = input.substring(startPosition, length);
                if (temp == "")
                    startPosition = endPosition;
                else {
                    //var newGroup = group.getItem(0, temp.split(' '));
                    //if (newGroup != null) {
                    //    group = newGroup;
                    //    endPos = endPosition;
                    //}
                    //else
                    //    break;
                    //startPosition = endPosition;
                }
            }
        }
        //commands = group.getCommands();
        return new ParsedCommandInfo(commands != null, commands, endPos);
    }

    /**
     * Check if c is whitespace
     * @param c - Character to check
     */
    private static IsWhiteSpace(c: string): boolean {
        return c == ' ' || c == '\n' || c == '\r' || c == '\t'
    };

    public static ParseArgs(input: string, startPos: number, command: Command): ParsedArgsInfo {
        let args: string[];

        let currentPart: ParserPart = ParserPart.None;
        let startPosition: number = startPos;
        let endPosition: number = startPos;
        let inputLength: number = input.length;
        let isEscaped: boolean = false;

        let expectedArgs: CommandParameter[] = command.parameters;
        let argList: string[] = [];
        let parameter: CommandParameter = null;

        args = null;

        if (input == "")
            return new ParsedArgsInfo(CommandErrorType.InvalidInput, null);

        while (endPosition < inputLength) {
            if (startPosition == endPosition && (parameter == null || parameter.type != ParameterType.Multiple)) { //Is first char of a new arg
                if (argList.length >= expectedArgs.length)
                    return new ParsedArgsInfo(CommandErrorType.BadArgCount, null); //Too many args
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
                        return new ParsedArgsInfo(CommandErrorType.InvalidInput, null);
                    break;
                case ParserPart.DoubleQuotedParameter:
                    if ((!isEscaped && currentChar == '\"')) {
                        let temp: string = input.substring(startPosition, endPosition - 1);
                        argList.push(temp);
                        currentPart = ParserPart.None;
                        startPosition = endPosition;
                    }
                    else if (endPosition >= inputLength)
                        return new ParsedArgsInfo(CommandErrorType.InvalidInput, null);
                    break;
            }
        }

        //Unclosed quotes
        if (currentPart == ParserPart.QuotedParameter || currentPart == ParserPart.DoubleQuotedParameter)
            return new ParsedArgsInfo(CommandErrorType.InvalidInput, null);

        //Too few args
        for (let i: number = argList.length; i < expectedArgs.length; i++) {
            var param = expectedArgs[i];
            switch (param.type) {
                case ParameterType.Required:
                    return new ParsedArgsInfo(CommandErrorType.BadArgCount, null);
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
        return new ParsedArgsInfo(null, args);
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