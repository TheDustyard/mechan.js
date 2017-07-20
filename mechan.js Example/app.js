const Mechan = require("../mechan.js");

console.log(Mechan);

var handler = new Mechan.CommandHandler(null);
handler.on('error', (e) => console.log(e));
handler.handle();

console.log(Mechan.version);

let builder = new Mechan.CommandBuilder()
    .setName("dank")
    .addParameter(new Mechan.CommandParameter("name", Mechan.ParameterType.Required))
    .addParameter(new Mechan.CommandParameter("desc", Mechan.ParameterType.Unparsed))
    .addParameter(new Mechan.CommandParameter("moredesc", Mechan.ParameterType.Optional));

console.log(Mechan.HelpMode);
