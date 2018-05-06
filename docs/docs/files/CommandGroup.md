# CommandGroup

## Constructor
```js
new Mechan.CommandGroup(handler, parent, name, commands, prechecks, category, visible)
```
|Parameter | Type                                                                                              | Optional | Default                    | Description                                                   |
|----------|---------------------------------------------------------------------------------------------------|----------|----------------------------|---------------------------------------------------------------|
|handler   |[CommandHandler](#CommandHandler)                                                                  |          |                            | Handler that handles the commands                             |
|parent    |[CommandGroup](#CommandGroup)                                                                      |          |                            | Parent group                                                  |
|name      |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  |          |                            | Name of the group                                             |
|commands  |[Command](#Command)[]                                                                              |✘         |<pre><code>[]</code></pre>  | Subcommands                                                   |
|prechecks |[PermissionCheck](#PermissionCheck)[]                                                              |✘         |<pre><code>[]</code></pre>  | Checks to preform on all commands                             |
|category  |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  |✘         |                            | Category the command fits into                                |
|visible   |[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✘         |<pre><code>true</code></pre>| Whether or not the command is visible in the default help menu|


|[Properties](#CommandGroup?scrollTo=properties)  |[Methods](#CommandGroup?scrollTo=methods)            |Events|
|-------------------------------------------------|-----------------------------------------------------|------|
|[name](#CommandGroup?scrollTo=name)              |[createCommand](#CommandGroup?scrollTo=createCommand)|      |
|[fullname](#CommandGroup?scrollTo=fullname)      |[createGroup](#CommandGroup?scrollTo=createGroup)    |      |
|[handler](#CommandGroup?scrollTo=handler)        |                                                     |      |
|[commands](#CommandGroup?scrollTo=commands)      |                                                     |      |
|[groups](#CommandGroup?scrollTo=groups)          |                                                     |      |
|[parent](#CommandGroup?scrollTo=parent)          |                                                     |      |
|[prechecks](#CommandGroup?scrollTo=prechecks)    |                                                     |      |
|[category](#CommandGroup?scrollTo=category)      |                                                     |      |
|[visible](#CommandGroup?scrollTo=visible)        |                                                     |      |

## Properties
### .name
Name of the group
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### .fullname
Fullname of the group
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### .handler
Handler that handles the command
**Type:** [CommandHandler](#CommandHandler)

### .commands
Subcommands
**Type:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Command](#Command)>

### .groups
Subgroups
**Type:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [CommandGroup](#CommandGroup)>

### .parent
Parent group
**Type:** [CommandGroup](#CommandGroup)

### .prechecks
Checks to preform on all commands
**Type:** [PermissionCheck](#PermissionCheck)

### .category
Category the group fits into
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### .visible
Whether or not the command is visible in the default help menu
**Type:** [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)


## Methods
<h3 id="createCommand"> .createCommand(name)</h3>
Create a command
|Parameter|Type                                                                                             |Optional|Default|Description                |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|---------------------------|
|name     |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |The context for the command|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="createGroup"> .createGroup(name, callback)</h3>
Create a command group
|Parameter|Type                                                                                             |Optional|Default|Description                |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|---------------------------|
|name     |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |The context for the command|
|callback |(group: [CommandGroupBuilder](#CommandGroupBuilder)) => void                                     |✘       |       |Initialisation function    |

**Returns: [CommandGroupBuilder](#CommandGroupBuilder)**

<hr>