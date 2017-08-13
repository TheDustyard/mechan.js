## Create the variables
Near the top of your file you wouls want to add the following
```js
let AFKs = new Map();
```

## Create the functions
```js
function AFK(context) {
    let reason = context.args[0];

    if (reason === "")
        reason = "AFK";

    AFKs.set(context.message.author.username, reason);

    context.message.channel.send(`${context.message.author}, I set your AFK: ${reason}`);
}

function UnAFK(message) {
    if (AFKs.get(message.author.username) === undefined)
        return;

    AFKs.delete(message.author.username);

    message.channel.send(`Welcome back ${message.author } `)
        .then(x => setTimeout(() => x.delete(), 10000));
}

function checkMention(msg) {
    if (msg.author.bot) return;
    if (!msg.mentions.members) return;
    var mentions = msg.mentions.members.array();
    for (person in AFKs) {
        if (mentions.some(x => x.user.username === person))
            msg.channel.send(`** ${person.tag }** is * AFK *: ${afks.get(person) } `)
                .then(x => setTimeout(() => x.delete(), 10000));
    }
}
```

## Creating the command
After the decleration of your command handler, define a command
```js
handler.createCommand("afk")
    .setCategory("Util commands")
    .setDescription("Go afk")
    .setCallback(AFK)
```

## Removing afk
Add an event handler
```js
client.on("message", (message) => {
    UnAFK(message);
    checkMention(message);
});
```