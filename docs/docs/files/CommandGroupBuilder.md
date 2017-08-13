# CommandGroupBuilder <span style="font-weight:normal; font-size:.5em">extends [CommandGroup](#CommandGroup)</span>


## Constructor
```js
new Mechan.CommandGroupBuilder(handler, parent, name, category, prechecks)
```
|Parameter | Type                                                                                              | Optional | Default                    | Description                                                   |
|----------|---------------------------------------------------------------------------------------------------|----------|----------------------------|---------------------------------------------------------------|
|handler   |[CommandHandler](#CommandHandler)                                                                  |          |                            | Handler that handles the commands                             |
|parent    |[CommandGroup](#CommandGroup)                                                                      |✘         |                            | Parent group                                                  |
|name      |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  |✘         |<pre><code>""</code></pre>  | Name of the group                                             |
|category  |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  |✘         |                            | Category the command fits into                                |
|visible   |[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✘         |<pre><code>true</code></pre>| Whether or not the command is visible in the default help menu|
|prechecks |[PermissionCheck](#PermissionCheck)[]                                                              |✘         |<pre><code>[]</code></pre>  | Checks to preform on all commands                             |

|[Properties](#CommandGroupBuilder?scrollTo=properties)  |[Methods](#CommandGroupBuilder?scrollTo=methods)            |Events|
|--------------------------------------------------------|------------------------------------------------------------|------|
|[name](#CommandGroupBuilder?scrollTo=name)              |[createCommand](#CommandGroupBuilder?scrollTo=createCommand)|      |
|[fullname](#CommandGroupBuilder?scrollTo=fullname)      |[createGroup](#CommandGroupBuilder?scrollTo=createGroup)    |      |
|[handler](#CommandGroupBuilder?scrollTo=handler)        |[setCategory](#CommandGroupBuilder?scrollTo=setCategory)    |      |
|[commands](#CommandGroupBuilder?scrollTo=commands)      |[addCheck](#CommandGroupBuilder?scrollTo=addCheck)          |      |
|[groups](#CommandGroupBuilder?scrollTo=groups)          |[show](#CommandGroupBuilder?scrollTo=show)                  |      |
|[parent](#CommandGroupBuilder?scrollTo=parent)          |[hide](#CommandGroupBuilder?scrollTo=hide)                  |      |
|[prechecks](#CommandGroupBuilder?scrollTo=prechecks)    |                                                            |      |
|[category](#CommandGroupBuilder?scrollTo=category)      |                                                            |      |
|[visible](#CommandGroupBuilder?scrollTo=visible)        |                                                            |      |

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

<h3 id="setCategory"> .setCategory(category)</h3>
Set the category of the group
|Parameter|Type                                                                                             |Optional|Default|Description                   |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|------------------------------|
|category |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |Category the command fits into|

**Returns: [CommandGroupBuilder](#CommandGroupBuilder)**

<hr>

<h3 id="addCheck"> .addCheck(check)</h3>
Add a permission check
|Parameter|Type                               |Optional|Default|Description                      |
|---------|-----------------------------------|------- |-------|---------------------------------|
|check    |[PermissionCheck](#PermissionCheck)|        |       |Checks to preform on all commands|

**Returns: [CommandGroupBuilder](#CommandGroupBuilder)**

<hr>

<h3 id="show"> .show()</h3>
Show the group

**Returns: [CommandGroupBuilder](#CommandGroupBuilder)**

<hr>

<h3 id="hide"> .hide()</h3>
Hide the group

**Returns: [CommandGroupBuilder](#CommandGroupBuilder)**

<hr>