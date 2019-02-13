/*!
 * Copyright (C) 2019  Zachary Kohnen
 */

import { GuildMember } from "discord.js";
import "reflect-metadata";
import { Group, ModuleBase } from "../src";

@Group("wipe")
export class WipeModule extends ModuleBase {
    // ~admin clean 15
    // @Command
    public Default() {
        console.log(Infinity);
    }
}

@Group("clean", [WipeModule])
export class CleanModule extends ModuleBase {
    // ~admin clean 15
    // @Command
    public async Default(count: number = 10) {
        return this.Messages(count);
    }

    // ~admin clean messages 15
    // @Command("messages")
    public async Messages(count: number = 10) {
        console.log(count);
        // this.context.channel;
    }
}

@Group("admin", [CleanModule])
export default class AdminModule {
    // ~admin ban foxbot#0282
    // @Command("ban")
    public async Ban(user: GuildMember) {
        console.log(user);
        // user.ban()
    }
}