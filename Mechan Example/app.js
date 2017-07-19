const Mechan = require("../Mechan");

console.log(Mechan);

//new Mechan.Command("Killeth");

console.log(Mechan.version);

let builder = new Mechan.CommandBuilder();
console.log(builder.category);
builder.setName("dank");