# AFK Command
<span style="color: red">DISCLAMER: READ <a href="https://discordapp.com/developers/docs/legal">API TOS</a> BEFORE USING THIS IN YOUR BOT, BE SURE TO OBLIGE BY THE TERMS</span>
## Create the variables
We will be storing the people who are AFK in a map
```js
let AFKs = new Map();
```

## Create the functions
We need 3 functions, one to enable the afk, one to disable the afk, and one to warn people when they mention someone who is afk
```js
// Enable afk
function AFK(context) {
    // Get reason of afk
    let reason = context.args[0];
    
    // If no reason, set it as "AFK"
    if (reason === "")
        reason = "AFK";

    // Set the user as afk by adding them to the list
    AFKs.set(context.message.author.id, reason);

    // Tell them that they were made AFK
    context.message.channel.send(`${context.message.author}, I set your AFK: ${reason}`);
}

function UnAFK(message) {
    // Check if they are AFK, if not, dont do anything
    if (AFKs.get(message.author.id) === undefined)
        return;

    // Remove them from the AFK list
    AFKs.delete(message.author.id);

    // Welcome them back
    message.channel.send(`Welcome back ${message.author } `)
        .then(x => setTimeout(() => x.delete(), 10000));
}

function checkMention(msg) {
    // If user is bot, do nothing
    if (msg.author.bot) return;
    
    // If message has no mentions, do nothing
    if (!msg.mentions.members) return;
    
    // Get all mentions as an array
    var mentions = msg.mentions.members.array();
    
    // Loop through all AFK people
    for (person in AFKs) {
        // Check if their id is in the list
        if (mentions.some(x => x.user.id === person))
            // If it is, warn the sender
            msg.channel.send(`**${person.tag }** is *AFK* : ${afks.get(person)}`)
                .then(x => setTimeout(() => x.delete(), 10000));
    }
}
```

## Creating the command
We need to declare the command to enable the AFK
```js
handler.createCommand("afk")
    .setCategory("Util commands")
    .setDescription("Go afk")
    // Set callback to the function we just made
    .setCallback(AFK)
```

## Removing afk
Either unafk the author of the message or warn them for mentioning the AFK user
```js
client.on("message", (message) => {
    UnAFK(message);
    checkMention(message);
});
```
