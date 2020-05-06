# Grid demo

So, this is a demo to see how you can build a game engine with JavaScript for the browser, making use of a grid map. To make the game and manage the resources with, I've used my world maker, which can be found on:

https://github.com/Lucas1981/world-maker

Export the file you make with the editor, turn it into a TypeScript `.ts` file (also adding `export default` to the beginning of the file - still have to get the json import to work) and you can use your frames, animations, tiles, actors, maps and sounds directly. The `/demo` file can give you an idea of how to set up all the `./lib` files so that you can manage the game flow and the behaviour of objects in a game stage.

Some lessons (also on non-coding things):

- I'll need to create a rect box for each animation, seeking out the furthest points where pixels are still found between all the frames in an animation. That way, you can compare the actor against the grid more accurately.
- Animations always start on the motion frame if the standing still frame is a part of it
- In order to not have the scanned drawings be rotated, add an anchor cross to lock the proper positioning
- A certain type of table can help to better draw the animations going back and forth
- An almost good frame can still be used, just draw it over on a new sheet of paper on top and adjust what you want to adjust
- The order of the animations is pretty random right now, I'd have to come up with a way to organize the order in which they are drawn so that some don't get overlapped by others (for instance bullets by their shooters)
- When drawing the legs (always hard), it makes sense to emphasize in the intersecting lines what leg is the front one and the back one. In a 3-frame based animation, that can make the difference
- Always make sure your outlines close
- The hardest part about creating a game is not getting demotivated. That is what takes most time. You don't know if what you're building will be worth anything or whether or not every frame you draw can be useful. But, you will learn and only know at the end, which makes it worth it. I am sorry now that I didn't push through more earlier, since the entire process does teach you a lot. It also takes a lot of iterations and stupid mistakes, that's just how it is.

To do:
- Simplify the BandGrid method in the Grid class. Calculate the corrections in getBandProbeCoordinates and you won't need getBandProbes but you can just use getProbes.
- Data files should really be json files, now those are .ts because I can't figure out how to feed .json files to TypeScript
- Good to know for myself: this engine + level editor took me two months to make in the off-hours, which seems reasonable.
- Have a mechanism that applies an alpha-mask analysis on the frames, so you can see if lingering pixels got in
- Create the rect box handler for the animations mentioned above. Think about how this can still be backwards-compatible or just refactor everything. Be sure to test thoroughly before doing that refactor.

Ideas for a next iteration:
- More layers of tiles
- Background layer (with parallax option)
- Scrolling
- Right now the hit detection is pretty absolute. Might be good to add a masking system to it to refine it.
- Consider adding more actor attributes, like visibility and background (like score points)
- Right now the progress is just hard limited to a tile. There are probably better ways to manage that.
- Sounds cannot be played continuously. Should be a way to have sounds loop. Whole sound setup could be changed
- Add music
