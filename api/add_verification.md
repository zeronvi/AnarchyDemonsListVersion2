# Add Verification

This is how you add a verification it is in js because it gives list points and thats how list.js and userData.js work together (use this in user.js DO NOT USE IN THE SOME FILE AS YOUR LIST IF YOUR DOING IT IN JS)

### Example request

```
var p = roundNumber(getUserPoint(i+1, 100, entry.percentToQualify, "144hz") * 1, 3);
        if (checkVerify == true) {
            for (var b = 0 ; b < user_data.length ; b++) {
                var user_name = user_data[b].name.toUpperCase(); var data_name = verifier.toUpperCase();
                if (user_name == data_name) {
                    user_data[b].point = user_data[b].point + p;
                    user_data[b].verified.push(i+1);
                }
            }
        } else {
            var prog = [];
            var verified = []; verified.push(i+1)

            user_data.push({name : verifier, highest : "null", progress : prog, point : p, verified : verified});
        }
```

