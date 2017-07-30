import { ParameterType } from '../../';

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