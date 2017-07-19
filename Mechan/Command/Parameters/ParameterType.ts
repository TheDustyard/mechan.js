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