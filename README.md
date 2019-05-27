# Grid demo

So, this is a demo to see how you can build a game engine with JavaScript for the browser, making use of a grid map. To make the game and manage the resources with, I've used my world maker, which can be found on:

https://github.com/Lucas1981/world-maker

Export the file you make with the editor, turn it into a TypeScript `.ts` file (also adding `export default` to the beginning of the file - still have to get the json import to work) and you can use your frames, animations, tiles, actors, maps and sounds directly. The `/demo` file can give you an idea of how to set up all the `./lib` files so that you can manage the game flow and the behaviour of objects in a game stage.

To do:
- Data files should really be json files, now those are .ts because I can't figure out how to feed .json files to TypeScript
- I want to create two more types of gameplay next to capture-the-flag and push-interaction, namely bullet-interaction and fighting-interaction, where bullet-interaction implies that actors can actually on-que add more actors to the stage themselves, who then have a life cycle of their own. Fight-interaction is about the interaction between two actors depending on what state they are currently in. It would come down to two booleans, signalling isVulnerable and isAttacking. When one actor who has isAttacking set to true meets another actor who has isVulnerable set to true, then that second actor gets hurt. The ability to hurt or get hurt depends on the state the actors are in, and could be coded with tags in the editor.
