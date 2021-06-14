# Contour collision detection

After thinking about this a little bit more, theoretically this is all not exactly that difficult. The main problem in my idea about this was to scan in the exact direction your agent is going, so in 360 degrees pretty much. But just as with normal collision detection, you can just check both dimensions separately. If you take this approach, you would have to do the calculations twice. I also believe it would solve all the problems with keeping track of custom boxes like I'm doing now. You can still introduce forgiving "corners" that will be allowed to be moved through, but the whole messy business of checking explicit limits of the agents seems redundant when you take the approach of just seeing where collision would take place based on column and row comparison.

I think I'd have to set up tests set, where:

First test
1. Position the acting agent inside a block
2. This block should have a pixel strip in exactly the same place as the actor
3. See if we can determine the collision between the actor and the tile.

Second test
1. Try to position an acting agent inside a block
2. Have that block show an overlapping strip, so it cannot be placed there
3. Calculate where the agent should then land "kissing the wall"

Third test
1. Initially the acting agent is positioned next to a block it cannot cross, in between two units
2. Then, one action should make the agent try to move far beyond that next block, so at least try to move three blocks.
3. The agent should end up exactly next to the block that should be stopping him.
4. Repeat in all directions

Fourth test,
1. Same initial situation
2. The next block should have pixels it cannot cross but positioned above the agent, so when the scan takes place it is determined that actually the actor can cross.
3. The agent should end up at its intended final situation.
4. Repeat in all directions

Fifth test
1. Same initial situation
2. The block where the agent ends up in should have a blocking part so that the player cannot arrive at its actual desired final destination
3. The agent will get as close as it can, "kissing the wall" so to speak
4. Repeat in all directions

Sixth test
- Actually exactly the same as the fifth test, but the actor must be already inside the block that will stop it.

Second and third test could theoretically even be fused.

Thinking about this, the events can actually just be time based, perhaps with an interrupt that can reset all the events. As for the problem with wanting to limit the interacting grids and agents to single pixels, it can also be strips of pixels, either horizontal or vertical or perhaps even interrupted or scattered about. That should make things very well visible.

The whole thing feels rather big, so perhaps it is a good idea to split it up into smaller bits:
- Create the animations, tiles and agents we need. So far I had balls in mind, but pixel strips might actually work better. Checkered pixel strips could be even better than that.
- Create an actual collision detection class that will handle our process
- Once those are in a universe, see if we can read the contour from the tile, in the collision class
- See if we can read the contour from the current agent's frame, in the collision class
- See if we can scan the rows of the agent to get its left-most sticking out row, with value.
- See if we can scan the rows of the agent to get the right-most sticking out row, with value.
- See if we can scan the columns of the agent to get the top-most sticking out column, with value.
- See if we can scan the columns of the agent to get the bottom-most sticking out column, with value.
- See if we can do the exact same things for a grid unit
- See if we can compare scanning the left side of an agent with the right side of a grid block, knowing they will overlap. Show the pixel(s) that we can ascertain will overlap.
- Calculate what the closest point could be for the actor to be able to stand next to the block without overlapping. Apply this position after highlighting where the overlapping takes place. In collision class.
- Highlight the contours in the game test
- Make it possible to toggle the highlighting of the contours to switch to debug mode
- Write a test framework that will "play" manipulations with a certain interval, communicating what's happening.
- Write the first test. Make sure that we already know what the outcome should be, so that we can test the final situation.
- Write the second test
- Write the third test
- Write the fourth test
- Write the fifth test
- Write the sixth test



So this one is a little different from the rest. The point is to explore how you can let two images intersect and have them figure out where exactly they overlap on the x or y contours of the images. It is a little tricky because not only do you want to check if the two images collide in the final instance but if they ever collided on their way (where, actually, one is movable and one is static). This would mean that:
- You would have to trace back all the tiles that the moving object moved through, from its starting position to its supposed final position.
- For each of the tiles in between:
  - You will have to see if it had any pixels (is solid or not)
  - If one of the tiles did have pixels, see if the rows (in the case of x) of the actor actually overlap with those of the tile.
  - If there is overlap:
    - find the row that has the greatest overlap between both tile and actor and use that row as an anchor point.
    - Position the actor so that it is kissing pixels with the point in the tile that is closest.
- For the final position, it is actually almost the same, but you will have to take the position of the player into consideration, which is not the case with the tiles in between because we know the player already tried to move through it completely. For the final position however, we do not know for sure if the actor moved all the way to the end, so we will have to compare the end of each row as we go through them with the end of each row of the actor's frame to see if there is actually overlap. If not, the player can just remain standing. A simple `isFinalPosition` flag might suffice to know we have to scan the player too though.

For one thing, I wonder if it is worth the trouble to go through an actual instance of the game engine, or if it would be more economic to just use some classes and make a custom interaction model that is more suited to provide proof for the functionality I'm after. Also, I wonder what the best models would be. Probably ones with very few pixels blown up on the screen might make the better candidates for this.
