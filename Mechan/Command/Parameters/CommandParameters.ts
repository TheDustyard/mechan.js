import { ParameterType } from '../Parameters/ParameterType';

export class CommandParameter {
    /**
     * Name of the parameter
     */
    name: string;
    /**
     * Type of the parameter
     */
    type: ParameterType;

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