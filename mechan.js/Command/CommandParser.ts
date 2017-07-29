import { Command } from './Command';
import { CommandMap } from './CommandMap';
import { CommandErrorContext, CommandErrorType } from './CommandErrorContext';
import { CommandParameter } from './Parameters/CommandParameters';
import { ParameterType } from './Parameters/ParameterType';

enum ParserPart {
    None,
    Parameter,
    QuotedParameter,
    DoubleQuotedParameter
}

export class CommandParser {
    /**
     * Parse a command
     * @param input - Input string
     * @param map - Command map to parse from
     */
	public static ParseCommand(input: String, map: CommandMap): [boolean, Command[], number] {
        let startPosition: number = 0;
        let endPosition: number = 0;
        let inputLength: number = input.length;
        let isEscaped: boolean = false;
        let commands: Command[] = null;
        let endPos: number = 0;

        if (input == "")
            return [false, null, null];

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
                    var newMap = map.getItem(0, temp.split(' '));
                    if (newMap != null) {
                        map = newMap;
                        endPos = endPosition;
                    }
                    else
                        break;
                    startPosition = endPosition;
                }
            }
        }
        commands = map.getCommands(); //Work our way backwards to find a command that matches our input
        return [commands != null, commands, endPos];
    }

    private static IsWhiteSpace(c: string): boolean {
        return c == ' ' || c == '\n' || c == '\r' || c == '\t'
    };

	//TODO: Check support for escaping
    public static ParseArgs(input: string, startPos: number, command: Command): [CommandErrorType, string[]]{
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

        if(input == "")
			return [CommandErrorType.InvalidInput, null];

        while(endPosition < inputLength) {
            if (startPosition == endPosition && (parameter == null || parameter.type != ParameterType.Multiple)) { //Is first char of a new arg
                if (argList.length >= expectedArgs.length)
                    return [CommandErrorType.BadArgCount, null]; //Too many args
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
                        let temp: string = input.substring(startPosition, endPosition - startPosition - 1);
                        argList.push(temp);
                        currentPart = ParserPart.None;
                        startPosition = endPosition;
                    }
                    else if (endPosition >= inputLength)
                        return [CommandErrorType.InvalidInput, null];
                    break;
                case ParserPart.DoubleQuotedParameter:
                    if ((!isEscaped && currentChar == '\"')) {
                        let temp: string = input.substring(startPosition, endPosition - startPosition - 1);
                        argList.push(temp);
                        currentPart = ParserPart.None;
                        startPosition = endPosition;
                    }
                    else if (endPosition >= inputLength)
                        return [CommandErrorType.InvalidInput, null];
                    break;
            }
        }

        //Unclosed quotes
        if (currentPart == ParserPart.QuotedParameter || currentPart == ParserPart.DoubleQuotedParameter)
            return [CommandErrorType.InvalidInput, null];

        //Too few args
        for (let i: number = argList.length; i < expectedArgs.length; i++)
        {
            var param = expectedArgs[i];
            switch (param.type) {
                case ParameterType.Required:
                    return [CommandErrorType.BadArgCount, null];
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
        return [null, args];
    }
}