import {
    HelpMode
} from '../';

export class CommandHandlerConfig {
    /**
     * Gets or sets the prefix character used to trigger commands, if ActivationMode has the Char flag set.
     */
    public prefixChar?: string;
    /**
     * Gets or sets whether a message beginning with a mention to the logged-in user should be treated as a command.
     */
    public mentionPrefix: boolean;
    /**
     * Changing this to true makes the bot ignore all messages, except when the messages are from its own account.
     * This is desired behavior for "Self Bots" only, so unless this bot is being run under a normal user's account, leave it alone!!
     */
    public selfBot: boolean;
    /**
     * Gets or sets whether a help function should be automatically generated.
     */
    public helpMode: HelpMode;

    /**
     * Create command handler config
     * @param prefixChar - Gets or sets the prefix character used to trigger commands, if ActivationMode has the Char flag set.
     * @param allowMentionPrefix - Gets or sets whether a message beginning with a mention to the logged-in user should be treated as a command.
     * @param isSelfBot - Changing this to true makes the bot ignore all messages, except when the messages are from its own account. This is desired behavior for "Self Bots" only, so unless this bot is being run under a normal user's account, leave it alone!!
     * @param helpMode - Gets or sets whether a help function should be automatically generated.
     */
    constructor(prefixChar: string = null, mentionPrefix: boolean = true, selfBot: boolean = false, helpMode: HelpMode = HelpMode.Disabled) {
        this.prefixChar = prefixChar;
        this.mentionPrefix = mentionPrefix;
        this.helpMode = helpMode;
        this.selfBot = selfBot;
    }
}

export class CommandHandlerConfigBuilder extends CommandHandlerConfig {
    /**
     * Build a command handler config
     */
    constructor() {
        super();
    }

    /**
     * Set the config's prefex char
     * @param prefixChar - Command prefix char
     */
    public setPrefixChar(prefixChar: string) {
        this.prefixChar = prefixChar;
        return this;
    }

    /**
     * Allow a mention as the command's prefix
     */
    public enableMentionPrefix() {
        this.mentionPrefix = true;
        return this;
    }

    /**
     * Do not allow a mention as the command's prefix
     */
    public disableMentionPrefix() {
        this.mentionPrefix = false;
        return this;
    }

    /**
     * Enable selfbot mode
     */
    public isSelfBot() {
        this.selfBot = true;
        return this;
    }

    /**
     * Disable selfbot mode
     */
    public isNotSelfBot() {
        this.selfBot = false;
        return this;
    }

    /**
     * Set the config's help mode
     * @param helpMode - Help mode of the config
     */
    public setHelpMode(helpMode: HelpMode) {
        this.helpMode = helpMode;
        return this;
    }
}