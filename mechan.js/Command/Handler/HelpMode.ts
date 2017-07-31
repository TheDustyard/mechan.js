export enum HelpMode {
    /**
     * Disable the automatic help command.
     */
    Disabled,
    /**
     * Use the automatic help command and respond in the channel the command is used.
     */
    Public,
    /**
     * Use the automatic help command and respond in a private message.
     */
    Private
}