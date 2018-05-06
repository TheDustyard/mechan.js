### Table Of Contents
* [Import](#The-Basics?scrollTo=import-mechan-and-create-a-client)
* [Create a handler](#The-Basics?scrollTo=creating-a-handler)
* [Create a command](#The-Basics?scrollTo=creating-a-command)
* [Create a command group](#The-Basics?scrollTo=creating-a-command-group)
    * [As a variable](#The-Basics?scrollTo=set-it-as-a-variable)
    * [Using callbacks](#The-Basics?scrollTo=or-use-a-callback)
    * [Nesting](#The-Basics?scrollTo=nesting-groups)
* [Initialization](#The-Basics?scrollTo=install-mechan-and-start-discordjs)


## Prerequisite

You must know the basics of [Discord.js](https://discord.js.org/#/) this is not a tutorial for that

## Import mechan and create a client
You can access Discord.js through ```Mechan.Discord```
```js
const Mechan = require('mechan.js');
const client = new Mechan.Discord.Client();
```

## Creating a handler
When you create a [CommandHandler](#CommandHandler) you pass a [CommandHandlerConfig](#CommandHandlerConfig) object
```js
//  Initialise a command handler
var handler = new Mechan.CommandHandler({
    prefix: 'd.',
    helpMode: Mechan.HelpMode.Public
});
```

## Creating a command
```js
//  Create a command in the base group
handler.createCommand("heman")
    .setDescription("WHEN I WAKE UP IN THE MORNING AND I STEP OUTSIDE")
    .setCategory("yth0")
    .addCheck((context) => {
        if (context.user.id === "168827261682843648")
            return {
                canRun: true
            };
        else
            context.channel.send("You must be Dadster to run this command");
            return {
                canRun: false,
                message: "Invalid user"
            };
    })
    .setCallback((context) => {
        context.channel.send("HEYA");
    });
```

## Creating a command group
### Set it as a variable
```js
//  Create a command group
var group = handler.createGroup("newgroup");
```
### Or use a callback
```js
//  Create a command group
handler.createGroup("send", (a) => {

    a.setCategory("Send commands");

    a.createCommand("to")
        .setDescription("Send a message to someone")
        .addParameter("username", 'required')
        .addParameter("message", "unparsed")
        .setCallback((context) => {
            //  Get member from name
            let member = context.message.guild.members.find(x => x.displayName.toLowerCase() === context.args[0].toLowerCase()
                || x.user.username.toLowerCase() === context.args[0].toLowerCase());
            if (!member) {
                context.channel.send(`member ${context.args[0]} not found`);
                return;
            }
            member.send(context.args[1]);
            context.channel.send(`sent your message to ${member.user.tag}`);
        });
});
```

### Nesting groups
```js
//  Create a command group
handler.createGroup("send", (a) => {

    a.setCategory("Send commands");

    a.createCommand("to")
        .setDescription("Send a message to someone")
        .addParameter("username", 'required')
        .addParameter("message", "unparsed")
        .setCallback((context) => {
            //  Get member from name
            let member = context.message.guild.members.find(x => x.displayName.toLowerCase() === context.args[0].toLowerCase()
                || x.user.username.toLowerCase() === context.args[0].toLowerCase());
            if (!member) {
                context.channel.send(`member ${context.args[0]} not found`);
                return;
            }
            member.send(context.args[1]);
            context.channel.send(`sent your message to ${member.user.tag}`);
        });

    //  Create a group inside a group
    a.createGroup("thanks", (b) => {
        b.setCategory("Thank commands");

        b.createCommand("to")
            .setDescription("Send your thanks to someone")
            .addParameter("username", 'required')
            .setCallback((context) => {
                //  Get member from name
                let member = context.message.guild.members.find(x => x.displayName.toLowerCase() === context.args[0].toLowerCase()
                    || x.user.username.toLowerCase() === context.args[0].toLowerCase());
                if (!member) {
                    context.channel.send(`member ${context.args[0]} not found`);
                    return;
                }
                member.send("thx m8");
                context.channel.send(`sent your thanks to ${member.user.tag}`);
            });
    });

    //  Groups and commands can have the same name
    a.createCommand("thanks")
        .setDescription("Receive thanks")
        .setCategory("Thank commands")
        .setCallback((context) => {
            context.user.send("thanks m8");
            context.channel.send(`sent you your thanks`);
        });
});
```

## Install mechan and start Discord.js
`handler.install` returns the client, so you can use that to login
```js
//  Install the handler onto the client and login
handler.install(client)
    .login(Settings.token);
```
