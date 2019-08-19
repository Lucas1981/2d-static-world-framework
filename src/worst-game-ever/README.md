So, this will be the worst game ever.

The basic point of all of this is to create a gameplay, attainable goal and moderate challenge using all the resources I've created so far. How to build this? I kind of like the baddies I came up with, and I'll keep it relatively simple, using the wall-huggers, stage-frighters, bouncing balls and perhaps some static creatures that shoot fireballs (or eyeballs?) at the player. I'll iterate over the animations of the players and the baddies. I want to spend a month on this, iterating on something every day until I have all the elements in place. I want to go for eight levels, that should actually be enough for a simple game like this. So what needs to be done?

- The player character can't really enter a wall from without if it is not exactly positioned pixel-perfect near the entrance. I might want to add some mechanism that will accept some margin of error (like 4 pixels perhaps) and then correct it and let the player enter
- The hit detection with the walls could actually be optimized by adding a bounding box per state, where the editor figures out the maximum bounding box for all frames of a specific state. Then you can still move up closer to walls. You'll still have to make sure the actor is pushed back when the state changes because the bounding box could be different.
- The bullets should be coming from a factory in stead of creating them inside other players.
- I have a rough idea of what all the actors should look like, but I'll have to keep iterating on it to improve them.
- I know now that translating a spritesheet from drawing to rendition (given the pixel problem will be fixed) will take me about fourty minutes.
- I should approach the drawing of the actors perhaps a little more mathematically.
- I might want to start with the final level first and make that the hardest. Then go for the first level which should be the easiest. I'd also like to introduce an extra baddy each level for the first four levels, until I go for the final four levels that keep getting slightly harder.
- I'll have to add sounds. One for when the level starts, one for when you die, one for when you complete the level, one for when you collect something, one when the game starts, one for when a ball is fired and one when you finish the complete game.
- The level tiles can do with slightly more love, at least have north/east/south/west, etc variations where the walls are a little coloured off.

I want to do at least one thing each day, like one spritesheet, one sound, one level, etc.
