/*!
 * Copyright (C) 2019  Zachary Kohnen
 */

import { User } from "discord.js";
import "reflect-metadata";
import { Group, ModuleBase } from "../src";

// Create a module with the 'sample' prefix
@Group("sample")
export default class Sample extends ModuleBase {
    // ~sample square 20 -> 400
    // @Command("square") @Summary("Squares a number.")
    public async Square(/* @Summary("The number to square.") */ num: number) {
        console.log(num);
        // We can also access the channel from the Command Context.
        // await this.context.channel.send(`${num}^2 = ${Math.pow(num, 2)}`);
    }

    // ~sample userinfo --> foxbot#0282
    // ~sample userinfo @Khionu --> Khionu#8708
    // ~sample userinfo Khionu#8708 --> Khionu#8708
    // ~sample userinfo Khionu --> Khionu#8708
    // ~sample userinfo 96642168176807936 --> Khionu#8708
    // ~sample whois 96642168176807936 --> Khionu#8708
    // @Command("userinfo") @Summary("Returns info about the current user, or the user parameter, if one passed.")
    // @Alias("user", "whois")
    public async UserInfo(/* @Summary("The (optional) user to get info for") */ user?: User) {
        console.log(user);
        // let userInfo = user || this.context.client.me;
        // await this.reply(userInfo.tag);
    }
}