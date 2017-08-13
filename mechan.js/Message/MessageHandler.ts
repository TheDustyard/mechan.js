import {
    Client,
    Message
} from 'discord.js';

export class MessageHandler {
    /**
     * messages for the handler
     */
    public messages: Map<string, (message: Message) => void>;
    /**
     * Client to handle
     */
    public client: Client;

    /**
     * Create a message handler
     * @param client - Client to handle
     */
    constructor(client: Client) {
        this.client = client;

        client.on('message', (message) => {
            let messagecontent = message.content;

            let callback = this.messages.get(messagecontent.toLowerCase());

            try {
                callback(message);
            } catch (e) {

            }
        });
    }

    /**
     * Add a message to the handler
     * @param message - Message to handler
     * @param callback - Callback to call
     */
    public addMessage(message: string, callback: (message: Message) => void): this {
        this.messages.set(message.toLowerCase(), callback);
        return this;
    }

}