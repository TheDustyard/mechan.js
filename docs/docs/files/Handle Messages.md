## Creating a handler

When you create a CommandHandler, you pass the Client to handle object
```js
//  Initialise a command handler
var messagehandler = new Mechan.MessageHandler(client);
```
## Adding a message
```js
messagehandler.addMessage("this is a message", (message) => message.channel.send("this is a response"));
```