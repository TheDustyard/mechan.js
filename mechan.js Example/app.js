const Mechan = require('../mechan.js');
const Client = new Mechan.Discord.Client();

Client.

console.log(Mechan);

var handler = new Mechan.CommandHandler(null);
handler.on('debug', (msg) => console.log(msg));
handler.on('warn', (msg) => console.warn(msg));
handler.on('error', (msg) => console.error(msg));
handler.on('failure', (msg) => console.log(msg));
handler.on('success', (context) => console.log(context));
handler.handle();

console.log(Mechan.version);

let builder = new Mechan.CommandBuilder()
    .setName("dank")
    .addParameter(new Mechan.CommandParameter("name", Mechan.ParameterType.Required))
    .addParameter(new Mechan.CommandParameter("desc", Mechan.ParameterType.Unparsed))
    .addParameter(new Mechan.CommandParameter("moredesc", Mechan.ParameterType.Optional));

console.log(Mechan.HelpMode);

var command = new Mechan.CommandBuilder()
    .setName('example')
    .setDescription('useful command desc')
    .setCategory('examples')
    .setVisible(true)
    .addParameter(new Mechan.CommandParameter('param 1', Mechan.ParameterType.Optional));

command.clearParameters();