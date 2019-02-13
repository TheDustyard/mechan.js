/*!
 * Copyright (C) 2019  Zachary Kohnen
 */

import { Client as DiscordClient, ClientOptions } from "discord.js";

export type CommandClass = new () => any;

export interface IClientOptions extends ClientOptions {
    /** The command prefix */
    prefix: string;
    /** The commands to load */
    commands: CommandClass[];
}

export default class Client extends DiscordClient {
    constructor(options: IClientOptions) {
        super(options);

        console.log(CommandGroupInfo(options.commands));
    }
}

function CommandGroupInfo(groups: CommandClass[]) {
    let groupnames: string[] = [];
    for (let group of groups) {
        let children = Reflect.getMetadata("mechan:children", group) as CommandClass[];
        let name = Reflect.getMetadata("mechan:name", group) as string;

        groupnames.push(name);
        groupnames = groupnames.concat(CommandGroupInfo(children).map(x => `${name} ${x}`));
    }

    return groupnames;
}