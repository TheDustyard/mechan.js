# CommandBuilder <span style="font-weight:normal; font-size:.5em">extends [Command](#Command)</span>

## Constructor
```js
new Mechan.CommandBuilder(name);
```
| Parameter   | Type                                                                                                | Optional | Default | Description                                                    |
|-------------|-----------------------------------------------------------------------------------------------------|----------|---------|----------------------------------------------------------------|
| name        | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   |          |         | Name of the command                                            |

|[Properties](#CommandBuilder?scrollTo=properties)  |[Methods](#CommandBuilder?scrollTo=methods)                |Events|
|---------------------------------------------------|-----------------------------------------------------------|------|
|[name](#CommandBuilder?scrollTo=name)              |[canRun](#CommandBuilder?scrollTo=canRun)                  |      |
|[fullname](#CommandBuilder?scrollTo=fullname)      |[setCallback](#CommandBuilder?scrollTo=setCallback)        |      |
|[callback](#CommandBuilder?scrollTo=callback)      |[addParameter](#CommandBuilder?scrollTo=addParameter)      |      |
|[parameters](#CommandBuilder?scrollTo=parameters)  |[clearParameters](#CommandBuilder?scrollTo=clearParameters)|      |
|[checks](#CommandBuilder?scrollTo=checks)          |[addCheck](#CommandBuilder?scrollTo=addCheck)              |      |
|[description](#CommandBuilder?scrollTo=description)|[addChecks](#CommandBuilder?scrollTo=addChecks)            |      |
|[category](#CommandBuilder?scrollTo=category)      |[clearChecks](#CommandBuilder?scrollTo=clearChecks)        |      |
|[visible](#CommandBuilder?scrollTo=visible)        |[setDescription](#CommandBuilder?scrollTo=setDescription)  |      |
|                                                   |[setCategory](#CommandBuilder?scrollTo=setCategory)        |      |
|                                                   |[show](#CommandBuilder?scrollTo=show)                      |      |
|                                                   |[hide](#CommandBuilder?scrollTo=hide)                      |      |


## Properties
### .name
Name of the command
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### .fullname
Fullname of the command
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
   
### .callback
Callback for the command
**Type:** (event: [CommandContext](#CommandContext)) => void  
   
### .parameters
Parameters for the command
**Type:** [CommandParameter](#CommandParameter)[]

### .checks
Permission checks to perform
**Type:** [PermissionCheck](#PermissionCheck)[]

### .description
Description of the command
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### .category
Category the command fits into
**Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### .visible
Whether or not the command is visible in the default help menu
**Type:** [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## Methods
<h3 id="canRun"> .canRun(context)</h3>
Checks all permission checks and verifies if a command can be run
|Parameter|Type                             |Optional|Default|Description                |
|---------|---------------------------------|------- |-------|---------------------------|
|context  |[CommandContext](#CommandContext)|        |       |The context for the command|

**Returns: [PermissionCheckResult](#PermissionCheckResult)**

<hr>

<h3 id="setCallback"> .setCallback(callback)</h3>
Set the command's callback
|Parameter |Type                                                |Optional|Default|Description             |
|----------|----------------------------------------------------|------- |-------|------------------------|
|callback  |(context: [CommandContext](#CommandContext)) => void|        |       |Callback for the command|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="addParameter"> .addParameter(name, type)</h3>
Add a command parameter
|Parameter|Type                                                                                             |Optional|Default|Description   |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|--------------|
|name     |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |Parameter name|
|type     |[ParameterType](#ParamaterType)                                                                  |        |       |Parameter type|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="clearParameters"> .clearParameters()</h3>
Remove all perameters

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="addCheck"> .addCheck(check)</h3>
Add a permission check
|Parameter |Type                               |Optional|Default|Description |
|----------|-----------------------------------|------- |-------|------------|
|check     |[PermissionCheck](#PermissionCheck)|        |       |Check to add|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="addChecks"> .addChecks(checks)</h3>
Add permission checks
|Parameter |Type                                 |Optional|Default|Description  |
|----------|-------------------------------------|------- |-------|-------------|
|checks    |[PermissionCheck](#PermissionCheck)[]|        |       |Checks to add|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="clearChecks"> .clearChecks()</h3>
Remove all checks

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="setDescription"> .setDescription(description)</h3>
Set command's description
|Parameter  |Type                                                                                             |Optional|Default|Description               |
|-----------|-------------------------------------------------------------------------------------------------|------- |-------|--------------------------|
|description|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |Description of the command|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="setCategory"> .setCategory(category)</h3>
Set command's category
|Parameter|Type                                                                                             |Optional|Default|Description                   |
|---------|-------------------------------------------------------------------------------------------------|------- |-------|------------------------------|
|category |[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|        |       |Category the command fits into|

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="show"> .show()</h3>
Set the command's visibility to true

**Returns: [CommandBuilder](#CommandBuilder)**

<hr>

<h3 id="hide"> .hide()</h3>
Set the command's visibility to false

**Returns: [CommandBuilder](#CommandBuilder)**