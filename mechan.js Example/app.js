const Mechan = require("../mechan.js");

console.log(Mechan);

new Mechan.Command("Killeth");

console.log(Mechan.version);

let builder = new Mechan.CommandBuilder()
    .setName("dank")
    .addParameter(new Mechan.CommandParameter("name", Mechan.ParameterType.Required))
    .addParameter(new Mechan.CommandParameter("desc", Mechan.ParameterType.Unparsed))
    .addParameter(new Mechan.CommandParameter("moredesc", Mechan.ParameterType.Optional));

console.log(Mechan.HelpMode);
