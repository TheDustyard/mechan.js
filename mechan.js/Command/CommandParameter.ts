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
    Required,
    /**
     * Catches a single optional parameter.
     */
    Optional,
    /**
     * Catches a zero or more optional parameters.
     */
    Multiple,
    /**
     * Catches all remaining text as a single optional parameter.
     */
    Unparsed
}