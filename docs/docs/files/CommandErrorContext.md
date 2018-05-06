# CommandErrorContext <span style="font-weight:normal; font-size:.5em">extends [CommandContext](#CommandContext)</span>

## Constructor
```js
new Mechan.CommandErrorContext(error, errorType, context)
```
|Parameter | Type                                                                                                | Optional | Default | Description                              |
|----------|-----------------------------------------------------------------------------------------------------|----------|---------|------------------------------------------|
| message  | [Message](https://discord.js.org/#/docs/main/stable/class/Message)                                  |          |         | Message that called the command          |
| command  | [Command](#Command)                                                                                 |          |         | Comamnd that was called                  |
| args     | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[] |          |         | Parameters for the command               |
| handler  | [CommandHandler](#CommandHandler)                                                                   |          |         | Command handler that handled the command |

|[Properties](#CommandErrorContext?scrollTo=properties)  |Methods|Events|
|--------------------------------------------------------|-------|------|
|[user](#CommandErrorContext?scrollTo=user)              |       |      |
|[message](#CommandErrorContext?scrollTo=message)        |       |      |
|[channel](#CommandErrorContext?scrollTo=channel)        |       |      |
|[command](#CommandErrorContext?scrollTo=command)        |       |      |
|[handler](#CommandErrorContext?scrollTo=handler)        |       |      |
|[args](#CommandErrorContext?scrollTo=args)              |       |      |
|[error](#CommandErrorContext?scrollTo=error)            |       |      |
|[errorType](#CommandErrorContext?scrollTo=errorType)    |       |      |

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

### .error
The error thrown
**Type:** [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

### .errorType
The type of error thrown
**Type:** [CommandErrorType](#CommandErrorType)