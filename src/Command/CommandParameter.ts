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
     * @param name - Name of the parameter
     * @param type - Type of the parameter
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
     * Catches zero or more optional parameters, stored as list.
     */
    Multiple = "multiple",
    /**
     * Catches all remaining text as a single optional parameter.
     */
    Unparsed = "unparsed"
}