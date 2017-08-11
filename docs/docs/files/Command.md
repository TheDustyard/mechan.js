# Command

## Constructor
```js
new Mechan.Command(name, callback, parameters, description, category, visible, checks);
```
| Parameter   | Type                                                                                                | Optional | Default | Description                                                    |
|-------------|-----------------------------------------------------------------------------------------------------|----------|---------|----------------------------------------------------------------|
| name        | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   |          |         | Name of the command                                            |
| callback    | (event: [CommandContext](#CommandContext)) => void                                                  |          |         | Callback for the command                                       |
| parameters  | [CommandParameter](#CommandParameter)[]                                                             |          |         | Command parameters                                             |
| checks      | [PermissionCheck](#PermissionCheck)[]                                                               | ✘        |         | Permission checks to perform                                   |
| description | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | ✘        |         | Description of the command                                     |
| category    | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | ✘        |         | Category the command fits into                                 |
| hidden      | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | ✘        |         | Whether or not the command is visible in the default help menu |

|[Properties](#CommandBuilder?scrollTo=properties)|[Functions](#CommandBuilder?scrollTo=functions)|
|-------------------------------------------------|-----------------------------------------------|
|[name](#Command?scrollTo=name)                   |[canRun](#Command?scrollTo=canRun)             |
|[fullname](#Command?scrollTo=fullname)           |                                               |
|[callback](#Command?scrollTo=callback)           |                                               |
|[parameters](#Command?scrollTo=parameters)       |                                               |
|[checks](#Command?scrollTo=checks)               |                                               |
|[description](#Command?scrollTo=description)     |                                               |
|[category](#Command?scrollTo=category)           |                                               |
|[visible](#Command?scrollTo=visible)             |                                               |

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

## Functions
<h3 id="canRun"> .canRun(context)</h3>
Checks all permission checks and verifies if a command can be run
|Parameter|Type          |Optional|Default|Description                |
|---------|--------------|------- |-------|---------------------------|
|context  |CommandContext|        |       |The context for the command|

**Returns: [PermissionCheckResult](#PermissionCheckResult)**