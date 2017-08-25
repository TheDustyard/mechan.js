# Warning Command
<span style="color: red">DISCLAMER: READ <a href="https://discordapp.com/developers/docs/legal">API TOS</a> BEFORE USING THIS IN YOUR BOT, BE SURE TO OBLIGE BY THE TERMS</span>
## Create the file
We will be storing the warnings in a file, so if the bot restarts, they will not be removed
Create a file called warnings.json in the same directory as the `app.json` file
Load the file into a variable with nodejs's `require` command, you could also use the filesystem, but I will use nodse's `require` for ease
```js
const fs = require('fs');
var warnings = require('./warnings.json');
```

## Create the commands
Add the functions
```js
// Dont ask, uses magic
function warningsCommand(context) {
    const mentioned = context.message.mentions.users.first();
    if (!context.message.member.hasPermission('KICK_MEMBERS')) {
        context.message.channel.send("Error: You do not have the permission (\'KICK_MEMBERS\') to give warnings.");
        return;
    }

    if (context.message.mentions.users.size !== 0) {
        if (context.args[0] === "<@!" + mentioned.id + ">" || context.args[0] === "<@" + mentioned.id + ">") {
            try {
                if (warnings[context.message.guild.id][mentioned.id] === undefined || warnings[context.message.guild.id][mentioned.id].length === 0) {
                    context.message.channel.send(mentioned.tag + " has no warnings.");
                    return;
                }
            } catch (err) {
                context.message.channel.send(mentioned.tag + " has no warnings.");
                return;
            }
            let arr = [];
            arr.push(`# ${mentioned.tag} has ` + warnings[context.message.guild.id][mentioned.id].length + " warnings.");
            for (var warn in warnings[context.message.guild.id][mentioned.id]) {
                arr.push(`<${parseInt(warn) + 1}>: "` + warnings[context.message.guild.id][mentioned.id][warn].reason +
                    "\" - " + context.message.guild.members.find("id", warnings[context.message.guild.id][mentioned.id][warn].user).user.tag + " - " + warnings[context.message.guild.id][mentioned.id][warn].time);
            }
            context.message.channel.send(`\`\`\`md\n${arr.join('\n')}\`\`\``);
        } else {
            context.message.channel.send("Correct Usage: " + handler.prefix + "warnings <user>");
        }
    } else {
        context.message.channel.send("Correct Usage: " + handler.prefix + "warnings <user>");
    }
}
function allWarningsCommand(context) {
    let arr = [];
    for (var user in warnings[context.message.guild.id]) {
        arr.push(`# ${context.message.guild.members.find("id", user).user.tag} has ` + warnings[context.message.guild.id][user].length + " warnings.");
        for (var warn = 0; warnings[context.message.guild.id][user].length > warn; warn++) {
            arr.push(`<${warn + 1}>: "` + warnings[context.message.guild.id][user][warn].reason + "\" - " + context.message.guild.members.find("id", warnings[context.message.guild.id][user][warn].user).user.tag + " - " + warnings[context.message.guild.id][user][warn].time);
        }
        context.message.channel.send(`\`\`\`md\n${arr.join('\n')}\`\`\``);
        arr = [];
    }
    //context.message.channel.send(arr.join('\n'));
}
function warnCommand(context) {
    const mentioned = context.message.mentions.users.first();
    if (!context.message.member.hasPermission('KICK_MEMBERS')) {
        context.message.channel.send("Error: You do not have the permission (\'KICK_MEMBERS\') to give warnings.");
        return;
    }
    if (context.message.mentions.users.size !== 0) {
        if (context.args[0] === "<@!" + mentioned.id + ">" || context.args[0] === "<@" + mentioned.id + ">") {
            if (context.args[1].length !== 0) {
                const date = new Date().toUTCString();
                if (warnings[context.message.guild.id] === undefined)
                    warnings[context.message.guild.id] = {};
                if (warnings[context.message.guild.id][mentioned.id] === undefined)
                    warnings[context.message.guild.id][mentioned.id] = [];
                    warnings[context.message.guild.id][mentioned.id].push({
                        reason: context.args[1],
                        time: date,
                        user: context.message.author.id
                    });
                fs.writeFile("./warnings.json", JSON.stringify(warnings, null, 4), (err) => { if (err) console.error(err); });
                context.message.channel.send(`Successfully warned ${mentioned.tag} for '${context.args[1]}'!`);
            } else {
                context.message.channel.send("Correct Usage: " + handler.prefix + "warn <user> [reason]");
            }
        } else {
            context.message.channel.send("Correct Usage: " + handler.prefix + "warn <user> [reason]");
        }
    } else {
        context.message.channel.send("Correct Usage: " + handler.prefix + "warn <user> [reason]");
    }
}
function clearwarnCommand(context) {
    let mentioned = context.message.mentions.users.first();
    if (!context.message.member.hasPermission('KICK_MEMBERS')) {
        context.message.channel.send("Error: You do not have the permission (\'KICK_MEMBERS\') to remove warnings.");
        return;
    }
    if (warnings[context.message.guild.id] === undefined)
        warnings[context.message.guild.id] = {};
    delete warnings[context.message.guild.id][mentioned.id];
    fs.writeFile("./warnings.json", JSON.stringify(warnings, null, 4), (err) => { if (err) console.error(err); });
    context.message.channel.send(`Deleted warnings from #${mentioned.tag}`);
}
function deletewarnCommand(context) {
    let mentioned = context.message.mentions.users.first();
    if (mentioned === undefined) {
        context.message.channel.send("Invalid mention");
        return;
    }
    context.args.shift();
    if (isNaN(context.args[0])) {
        context.message.channel.send("Invalid warning number");
        return;
    }
    if (!context.message.member.hasPermission('KICK_MEMBERS')) {
        context.message.channel.send("Error: You do not have the permission (\'KICK_MEMBERS\') to remove warnings.");
        return;
    }
    if (warnings[context.message.guild.id] === undefined)
        warnings[context.message.guild.id] = {};
    context.message.channel.send(`Deleted warn #${context.args[0]}`);
    delete warnings[context.message.guild.id][mentioned.id].splice(parseInt(context.args[0]) - 1, 1);
    if (warnings[context.message.guild.id][mentioned.id].length === 0) {
        delete warnings[context.message.guild.id][mentioned.id];
    }
    fs.writeFile("./warnings.json", JSON.stringify(warnings, null, 4), (err) => { if (err) console.error(err); });
}
```

Regester them

```js
// Warn command
handler.createCommand("warn")
    .addParameter("user", "required")
    .setDescription("Warns a user")
    .setCategory("Moderator Commands")
    .setCallback(warnCommand);
    
// Get warnings command
handler.createCommand("warnings")
    .addParameter("user", "optional")
    .setDescription("Gets a user's warnings or all the warnings for the guild")
    .setCallback((context) => {
        if (context.args.length === 1) {
            allWarningsCommand(context);
        } else {
            warnCommand(context);
        }
    
    });

// Clear warnings command
handler.createCommand("clearwarn")
    .addParameter("user", "required")
    .setDescription("Clears all of a user's warns")
    .setCallback(clearwarnCommand);

// Delete warning command
handler.createCommand("deletewarn")
    .addParameter("user", "required")
    .addParameter("user", "required")
    .setDescription("Removes a select warn from a user")
    .setCallback(deletewarnCommand);
```