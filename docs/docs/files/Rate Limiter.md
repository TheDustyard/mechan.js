# RateLimiter
<span style="color: red">DISCLAMER: READ <a href="https://discordapp.com/developers/docs/legal">API TOS</a> BEFORE USING THIS IN YOUR BOT, BE SURE TO OBLIGE BY THE TERMS</span>
## Create the variables
We will store the users that are rate limited in this Map
```js
var limitedusers = new Map();
```

## Create the functions
We need 3 more functions
```js
// One to add the user to the limited list
rateLimit(user, delay) {
    limitedUsers.set(user.id, Date.now() + delay);
}

// One to check if they are limited
isLimited(user) {
   let limitedtime = limitedUsers.get(user.id);
   // Check if the user's timeout is over
   return new Date(limitedtime) < Date.now()
}

//And lastly, one to use as a PermissionCheck
rateLimiter(context) {
    if(isLimited(context.message.author))
        return {
            canRun: false
        };
    else {
        return {
            canRun: true
        };
        //Change 1000 to the delay in miliseconds
        rateLimit(context.message.author, 1000)
    }
        
}
```

## Use the PermissionCheck
```js
handler.createCommand("heman")
    .setDescription("WHEN I WAKE UP IN THE MORNING AND I STEP OUTSIDE")
    .setCategory("yth0")
    .addCheck(rateLimiter) // Use the new `rateLimiter` function as a permision check
    .setCallback((context) => {
        context.channel.send("HEYA");
    });
```