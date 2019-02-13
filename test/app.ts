/*!
 * Copyright (C) 2019  Zachary Kohnen
 */

import "reflect-metadata";
import Client from "../src/client";
import AdminModule from "./AdminModule";
import Info from "./Info";
import Sample from "./Sample";

// TODO:? https://discord.foxbot.me/docs/guides/commands/commands.html#dependency-injection
let client = new Client({
    commands: [Info, AdminModule, Sample],
    prefix: "~"
});

// FIXME:
client.login(process.env.token).catch((err) => console.error(err));