const Settings = require('./settings.json');
const Mechan = require('../mechan.js');
const client = new Mechan.Discord.Client();


//  Initialise a command handler
var handler = new Mechan.CommandHandler({
    prefix: 'd.',
    helpMode: Mechan.HelpMode.Public
});

//  Events from the command handler
/*
 * Events invlude:
 *     Debug
 *     Warn
 *     Error
 *     Failure
 *     Success
 */
handler.on('debug', console.log);
handler.on('warn', console.warn);
handler.on('error', (message, error) => console.error(message + "\n" + error));
handler.on('failure', (handler, context) => context.channel.send(context.error.message));

//  Create a command group
handler.createGroup("send", (a) => {

    a.setCategory("Send commands");

    a.createCommand("to")
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
        .setCategory("Thank commands")
        .setCallback((context) => {
            context.user.send("thanks m8");
            context.channel.send(`sent you your thanks`);
        });
});

//  Create a command in the base group
handler.createCommand("heman")
    .setCategory("yth0")
    .addCheck((context) => {
        if (context.user.id === "168827261682843648")
            return {
                canRun: true
            };
        else
            return {
                canRun: false,
                message: "You must be Dadster to run this command"
            };
    })
    .setCallback((context) => {
        context.channel.send("HEYA");
    });

// Setup client on ready
client.on('ready', () => {
    client.user.setGame("mechan.js", "https://twitch.tv/dusterthefirst");
});

//  Install the handler onto the client and login
handler.install(client)
    .login(Settings.token);