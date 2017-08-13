# CommandContext

## Constructor
```js
new Mechan.CommandContext(message, command, args, handler)
```
|Parameter | Type                                                                                                | Optional | Default | Description                              |
|----------|-----------------------------------------------------------------------------------------------------|----------|---------|------------------------------------------|
| message  | [Message](https://discord.js.org/#/docs/main/stable/class/Message)                                  |          |         | Message that called the command          |
| command  | [Command](#Command)                                                                                 |          |         | Comamnd that was called                  |
| args     | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[] |          |         | Parameters for the command               |
| handler  | [CommandHandler](#CommandHandler)                                                                   |          |         | Command handler that handled the command |

|[Properties](#CommandContext?scrollTo=properties)  |Methods|Events|
|---------------------------------------------------|-------|------|
|[user](#CommandContext?scrollTo=user)              |       |      |
|[message](#CommandContext?scrollTo=message)        |       |      |
|[channel](#CommandContext?scrollTo=channel)        |       |      |
|[command](#CommandContext?scrollTo=command)        |       |      |
|[handler](#CommandContext?scrollTo=handler)        |       |      |
|[args](#CommandContext?scrollTo=args)              |       |      |

## Properties
### .user
User that called the command
**Type:** [User](https://discord.js.org/#/docs/main/stable/class/User)

### .message
Message that called the command
**Type:** [Message](https://discord.js.org/#/docs/main/stable/class/Message)
   
### .channel
Channel that the command was run in
**Type:** [TextChannel](https://discord.js.org/#/docs/main/stable/class/TextChannel) | [DMChannel](https://discord.js.org/#/docs/main/stable/class/DMChannel) | [GroupDMChannel](https://discord.js.org/#/docs/main/stable/class/GroupDMChannel) 
   
### .command
Comamnd that was called
**Type:** [Command](#Command)[]

### .handler
Command handler that handled the command
**Type:** [CommandHandler](#CommandHandler)

### .args
Command's parameters
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]