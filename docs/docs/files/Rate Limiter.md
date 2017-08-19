# RateLimiter

# Create the variables
```js
var limitedusers = new Map();
```

# Create the functions
```js
rateLimit(user, delay) {
    limitedUsers.set(user.id, Date.now() + delay);
}

isLimited(user) {
   let limitedtime = limitedUsers.get(user.id);
   return new Date(limitedtime) < Date.now()
}

rateLimiter(context) {
    if(isLimited(context.message.author))
        return {
            canRun: false
        };
    else {
        return {
            canRun: true
        };
        rateLimit(context.message.author, 1000) //Change 1000 to the delay in miliseconds
    }
        
}
```

# Use it
```js
handler.createCommand("heman")
    .setDescription("WHEN I WAKE UP IN THE MORNING AND I STEP OUTSIDE")
    .setCategory("yth0")
    .addCheck(rateLimiter) //pass the function as the argument
    .setCallback((context) => {
        context.channel.send("HEYA");
    });
```