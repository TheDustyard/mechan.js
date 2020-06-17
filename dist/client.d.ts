/*!
 * Copyright (C) 2019  Zachary Kohnen
 */
import { Client as DiscordClient, ClientOptions } from "discord.js";
export declare type CommandClass = new () => {
    [x: string]: unknown;
};
export interface IClientOptions extends ClientOptions {
    prefix: string;
    commands: CommandClass[];
}
export default class Client extends DiscordClient {
    constructor(options: IClientOptions);
}
