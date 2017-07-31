const Settings = require('./settings.json');
const Mechan = require('../mechan.js');
const Client = new Mechan.Discord.Client();

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

handler.on('failure', (handler, context) => console.error(context));
handler.on('success', (handler, context) => console.log(context));

var command = new Mechan.CommandGroupBuilder(handler, 'trigger');
console.log(command);
command.createGroup('ree')
    .setCategory('DANK')
    .addCheck((context) => {
        return [false, 'not dank enough'];
    });
console.log(command);