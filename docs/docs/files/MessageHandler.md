# MessageHandler

## Constructor
```js
new Mechan.MessageHandler(client)
```
|Parameter | Type                                                           | Optional | Default| Description     |
|----------|----------------------------------------------------------------|----------|--------|-----------------|
|client    |[Client](https://discord.js.org/#/docs/main/stable/class/Client)|          |        | Client to handle|

|[Properties](#MessageHandler?scrollTo=properties)|[Methods](#MessageHandler?scrollTo=methods)      |Events|
|-------------------------------------------------|-------------------------------------------------|------|
|[messages](#MessageHandler?scrollTo=config)      |[addMessage](#MessageHandler?scrollTo=addMessage)|      |
|[client](#MessageHandler?scrollTo=client)        |                                                 |      |

## Properties
### .messages
Root group for the handler
**Type:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), (message: [Message](https://discord.js.org/#/docs/main/stable/class/Message)) => void>

### .client
Client to handle
**Type:** [Client](https://discord.js.org/#/docs/main/stable/class/Client)


## Methods
<h3 id="addMessage"> .addMessage(cmd)</h3>
Add a message to the handler
|Parameter|Type                                                                                             |Optional|Default|Description       |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|------------------|
|message  |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |Message to handler|
|callback |(message: [Message](https://discord.js.org/#/docs/main/stable/class/Message)) => void            |        |       |Callback to call  |

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>