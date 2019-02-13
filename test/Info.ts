/*!
 * Copyright (C) 2019  Zachary Kohnen
 */

import "reflect-metadata";
import { Group, ModuleBase } from "../src";

// Create a module with no prefix
@Group()
export default class Info extends ModuleBase {
    // ~say hello -> hello
    // @Command("say") @Summary("Echos a message.")
    public async Say(/* @Remainder @Summary("The text to echo") */ echo: string): Promise<void> {
        console.log(echo);
        // ReplyAsync is a method on ModuleBase
        // await this.reply(echo);
    }
}