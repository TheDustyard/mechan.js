export class CommandParameter {
    /**
     * Name of the parameter
     */
    public name: string;
    /**
     * Type of the parameter
     */
    public type: ParameterType; 

    /**
     * Create a command parameter
     * @param name
     * @param type
     */
    constructor(name: string, type: ParameterType) {
        this.name = name;
        this.type = type;
    }
}

export enum ParameterType {
    /**
     * Catches a single required parameter.
     */
    Required = "required",
    /**
     * Catches a single optional parameter.
     */
    Optional = "optional",
    /**
     * Catches a zero or more optional parameters.
     */
    Multiple = "multiple",
    /**
     * Catches all remaining text as a single optional parameter.
     */
    Unparsed = "unparsed"
}