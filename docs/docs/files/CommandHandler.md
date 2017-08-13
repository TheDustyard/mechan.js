# CommandHandler

## Constructor
```js
new Mechan.CommandHandler(config)
```
|Parameter | Type                                        | Optional | Default| Description                  |
|----------|---------------------------------------------|----------|--------|------------------------------|
|config    |[CommandHandlerConfig](#CommandHandlerConfig)|          |        | Configuration for the handler|

|[Properties](#CommandHandler?scrollTo=properties)|[Methods](#CommandHandler?scrollTo=methods)          |[Events](#CommandHandler?scrollTo=events)|
|-------------------------------------------------|-----------------------------------------------------|-----------------------------------------|
|[config](#CommandHandler?scrollTo=config)        |                                                     |                                         |
|[root](#CommandHandler?scrollTo=fullname)        |                                                     |                                         |
|[client](#CommandHandler?scrollTo=handler)       |                                                     |                                         |

## Properties
### .config
Handler config
**Type:** [CommandHandlerConfig](#CommandHandlerConfig)

### .root
Root group for the handler
**Type:** [CommandGroupBuilder](#CommandGroupBuilder)

### .client
Client to handle
**Type:** [Client](https://discord.js.org/#/docs/main/stable/class/Client)


## Methods
<h3 id="install"> .install(client)</h3>
Install the handler onto Discord.js
|Parameter|Type                                                            |Optional|Default|Description     |
|---------|----------------------------------------------------------------|------- |-------|----------------|
|client   |[Client](https://discord.js.org/#/docs/main/stable/class/Client)|        |       |Client to handle|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="createGroup"> .createGroup(cmd)</h3>
Create a command group for the handler
|Parameter|Type                                                                                             |Optional|Default|Description                               |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|------------------------------------------|
|name     |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |Command group name                        |
|callback |(group: [CommandGroupBuilder](#CommandGroupBuilder)) => void                                     |✘       |       |Callback to initialise all the commands in|

**Returns: [CommandGroupBuilder](#CommandGroupBuilder)**

<hr>

<h3 id="createCommand"> .createCommand(cmd)</h3>
Create a command for the handler
|Parameter|Type                                                                                             |Optional|Default|Description |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|------------|
|cmd      |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |Command name|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>


## Events
### failure
Emitted when a command throws an error
|Parameter|Type                                       |
|---------|-------------------------------------------|
|handler  |[CommandHandler](#CommandHandler)          |
|context  |[CommandErrorContext](#CommandErrorContext)|

### success
Emitted when a command runs successfully
|Parameter|Type                             |
|---------|---------------------------------|
|handler  |[CommandHandler](#CommandHandler)|
|context  |[CommandContext](#CommandContext)|

### debug
Emitted when the handler would log to the console
|Parameter|Type                                                                                             |
|---------|-------------------------------------------------------------------------------------------------|
|message  |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|

### warn
Emitted when the handler would log to the warn console
|Parameter|Type                                                                                             |
|---------|-------------------------------------------------------------------------------------------------|
|message  |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|

### error
Emitted when the handler would log to the error console
|Parameter|Type                                                                                             |
|---------|-------------------------------------------------------------------------------------------------|
|message  |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|
|error    |[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)|