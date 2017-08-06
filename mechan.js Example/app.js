const Settings = require('./settings.json');
const Mechan = require('../mechan.js');
const client = new Mechan.Discord.Client();

var handler = new Mechan.CommandHandler({
    prefix: 'd.',
    helpMode: Mechan.HelpMode.Public
});

handler.on('debug', console.log);
handler.on('warn', console.warn);
handler.on('error', (message, error) => console.error(message + "\n" + error));

var commamamammamma = null;

//// NOTICE PLEASE DO NOT KILL ME NOW
handler.createGroup("killmenow", (newgroup) => {
    newgroup.createCommand("z")
        .addParameter("action", 'required')
        .addParameter("to", "required")
        .addParameter("action", "unparsed")
        .setCallback((context) => {
            console.log(context.command.fullname);
        });

    newgroup.createGroup("please", (newergroup) => {
        commamamammamma =
            newergroup.createCommand("jeff")
                .addParameter("person", 'required')
                .addParameter("action", "required")
                .addParameter("noun", "unparsed")
                .setCallback((context) => {
                    console.log(context.command.fullname);
                });
    });

    newgroup.createCommand("please")
        .setCallback((context) => {
            console.log(context.command.fullname);
        });
});

handler.createCommand("heman")
    .setCategory("yth0")
    .setCallback((context) => {
        console.log("HEYA");
    });

//console.warn(Mechan.CommandParser.ParseArgs('meme "did studds sdfsd fsag sgfs dfgs" peter piper picke a pickeled pepper', 0, commamamammamma));

console.warn(Mechan.CommandParser.parseCommand('killmenow please jeff reeeeeeeeeeeeeeeeeeeeeeeeeeeeee', handler.root));
console.warn(Mechan.CommandParser.parseCommand('heman reeeeeeeeeeeeeeeeeeeeeeeeeeeeee', handler.root));
console.warn(Mechan.CommandParser.parseCommand('killmenow please reeeeeeeeeeeeeeeeeeeeeeeeeeeeee', handler.root));

console.log(handler);

handler.install(client)
    .login(Settings.token);