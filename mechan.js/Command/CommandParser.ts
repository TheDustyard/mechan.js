import {
    CommandGroup,
    Command
} from "../";

enum ParserPart {
    None,
    Parameter,
    QuotedParameter,
    DoubleQuotedParameter
}

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
                    var newGroup = group.getItem(0, temp.split(' '));
                    if (newGroup != null) {
                        group = newGroup;
                        endPos = endPosition;
                    }
                    else
                        break;
                    startPosition = endPosition;
                }
            }
        }
        commands = group.getCommands();
    }

    /**
     * Check if c is whitespace
     * @param c - Character to check
     */
    private static IsWhiteSpace(c: string): boolean {
        return c == ' ' || c == '\n' || c == '\r' || c == '\t'
    };
}