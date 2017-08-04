const Settings = require('./settings.json');
const Mechan = require('../mechan.js');
const client = new Mechan.Discord.Client();

//console.log(Mechan);

//var handler = new Mechan.CommandHandler(
//    new Mechan.CommandHandlerConfigBuilder()
//        .isNotSelfBot()
//        .setHelpMode(Mechan.HelpMode.Private)
//        .setPrefixChar('.')
//    );
//handler.on('failure', (handler, context) => console.error(context));
//handler.on('success', (handler, context) => console.log(context));

//handler.install(Client);

////console.log(Mechan.version);

//let builder = handler.createCommand('dank')
//    .addParameter(new Mechan.CommandParameter("name", Mechan.ParameterType.Required))
//    .addParameter(new Mechan.CommandParameter("desc", Mechan.ParameterType.Unparsed))
//    .setCallback(context => {
//        console.log("ran: " + context.user.username);
//    });

////console.log(Mechan.HelpMode);

//var command = handler.createCommand('example')
//    .setDescription('useful command desc')
//    .setCategory('examples')
//    .show()
//    .addParameter(new Mechan.CommandParameter('param 1', Mechan.ParameterType.Optional));

//handler.addCommand(builder);
//handler.addCommand(command);

//Client.login(Settings.token);

var handler = new Mechan.CommandHandler({
    prefix: 'd.',
    helpMode: Mechan.HelpMode.Public
});

handler.on('debug', console.log);
handler.on('warn', console.warn);
handler.on('error', (message, error) => console.error(message + "\n\n" + error));

handler.install(client);

var group = new Mechan.CommandGroupBuilder(handler, null);

var commamamammamma = null;


//// NOTICE PLEASE DO NOT KILL ME NOW
group.createGroup("killmenow", (newgroup) => {
    newgroup.createGroup("please", (newergroup) => {
        commamamammamma =
            newgroup.createCommand("jeff")
                .addParameter("person", 'required')
                .addParameter("action", "required")
                .addParameter("noun", "unparsed");
    });
});

console.warn(Mechan.CommandParser.ParseArgs('meme "did studds sdfsd fsag sgfs dfgs" peter piper picke a pickeled pepper', 0, commamamammamma));

console.warn(Mechan.CommandParser.ParseCommand('killmenow please jeff reeeeeeeeeeeeeeeeeeeeeeeeeeeeee', group));