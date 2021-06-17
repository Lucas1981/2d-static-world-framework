# Grid demo

So, this is a demo to see how you can build a game engine with JavaScript for the browser, making use of a grid map. To make the game and manage the resources with, I've used my world maker, which can be found on:

https://github.com/Lucas1981/world-maker

Export the file you make with the editor, turn it into a TypeScript `.ts` file (also adding `export default` to the beginning of the file - still have to get the json import to work) and you can use your frames, animations, tiles, actors, maps and sounds directly. The `/demo` file can give you an idea of how to set up all the `./lib` files so that you can manage the game flow and the behaviour of objects in a game stage.

About a year later, I'm thinking about these things. A lot of the stuff still holds, some might need refinement:
X - The Grid class feels... bloated. It takes into account bounding boxes but I wonder if things could be simpler
X - The Progress class for the player in /resources also feels bloated. I wonder if my way to check if we are hitting something works but is (much) more complicated than it needs to be. It warrants another look.
X - The way I check the state of the player is inefficient. The whole FSM approach of the Game Programming Patterns - even if only packing state into an enum check switch and only then looking at input - feels much more efficient. As a consequence of the complexity now I can't get the jumping state to be stopped, for instance.
X - Scrolling is great, but I wonder if agents actually have enough space to be drawn if the camera is moving and if the agents are almost off the grid. I should actually test that. Maybe creating a Grid raster for the game as a debug is not a bad idea either.
- Right now the player character cannot fall off the grid, like off a cliff. It would just stand on top of the lowest NULL brick. I wonder if I can sneak that in somehow.
- If I figure out how to optimise the hit detection on tiles, I could also make things work with tiles that are not either completely solid or not. You could build the masking system so that the players can climb sloped tiles for instance. Would require rethinking the map editor too though. I actually put that in the "next iteration" section below, I see, so perhaps I should keep it there.
- Would be cool to implement a general functionality for climbing ladders in the 2d-platform resources. Same could be argued for ducking and possibly shooting. Might also be next iteration stuff.

## On the finer hit detection for tiles:

So it dawned on me that if I want to refine the hit detection, that's going to impact other things as well. For instance, if parts of the tiles will be see-through, that will mess with the current way the stage is rendered. If you move nothing gets painted over, so the open parts will just echo along with the movement. Also, I'd need a background for the tiles since it's not only the tiles any longer that make up the stage. There has to be something to the back of them. It could be a single color, it could be a (moving) background or it could be another grid of tiles. But something has to be in the background. Also, you'd need to be able to specify that in the world editor if you want to bring it in. Ideally I suppose four or five layers might do:
  - Background image or color
  - Background title
  - Main tiles
  - Actors
  - Foreground tiles (that will be drawn after the actors)

On the hit detection itself, it seems pretty easy actually. If the grid intersects and the boxes intersect, you go over the part where the two intersect, row by row comparing the numbers on y and column by column for x. First you'd have to isolate what overlaps where, then just plough through the `contour` member arrays. I guess I could first just paint the intersecting pixels red as a proof of concept. The hardest part might be to determine how far back the agent must move to kiss the tile. Supposedly the left-most row in the case of moving left, by as much as the amount that the agent intersects with the tile and then like this in all directions.

Those are a lot of things to manage though.

## Some lessons (also on non-coding things):

- I'll need to create a rect box for each animation, seeking out the furthest points where pixels are still found between all the frames in an animation. That way, you can compare the actor against the grid more accurately.
- Animations always start on the motion frame if the standing still frame is a part of it
- In order to not have the scanned drawings be rotated, add an anchor cross to lock the proper positioning
- A certain type of table can help to better draw the animations going back and forth
- An almost good frame can still be used, just draw it over on a new sheet of paper on top and adjust what you want to adjust
- The order of the animations is pretty random right now, I'd have to come up with a way to organize the order in which they are drawn so that some don't get overlapped by others (for instance bullets by their shooters)
- When drawing the legs (always hard), it makes sense to emphasize in the intersecting lines what leg is the front one and the back one. In a 3-frame based animation, that can make the difference
- Always make sure your outlines close
- The hardest part about creating a game is not getting demotivated. That is what takes most time. You don't know if what you're building will be worth anything or whether or not every frame you draw can be useful. But, you will learn and only know at the end, which makes it worth it. I am sorry now that I didn't push through more earlier, since the entire process does teach you a lot. It also takes a lot of iterations and stupid mistakes, that's just how it is.
- Good to know for myself: this engine + level editor took me two months to make in the off-hours, which seems reasonable.

To do:
X - Simplify the BandGrid method in the Grid class. Calculate the corrections in getBandProbeCoordinates and you won't need getBandProbes but you can just use getProbes.
- Data files should really be json files, now those are .ts because I can't figure out how to feed .json files to TypeScript
X - Create the rect box handler for the animations mentioned above. Think about how this can still be backwards-compatible or just refactor everything. Be sure to test thoroughly before doing that refactor.
X - Have a mechanism that applies an alpha-mask analysis on the frames, so you can see if lingering pixels got in
X - Right now the progress is just hard limited to a tile. There are probably better ways to manage that.
X - Scrolling

## Ideas for a next iteration:

- More layers of tiles
- Background layer (with parallax option)
- Right now the hit detection is pretty absolute. Might be good to add a masking system to it to refine it.
- Consider adding more actor attributes, like visibility and background (like score points)
- Sounds cannot be played continuously. Should be a way to have sounds loop. Whole sound setup could be changed
- Add music
