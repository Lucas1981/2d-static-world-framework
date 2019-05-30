# Grid demo

So, this is a demo to see how you can build a game engine with JavaScript for the browser, making use of a grid map. To make the game and manage the resources with, I've used my world maker, which can be found on:

https://github.com/Lucas1981/world-maker

Export the file you make with the editor, turn it into a TypeScript `.ts` file (also adding `export default` to the beginning of the file - still have to get the json import to work) and you can use your frames, animations, tiles, actors, maps and sounds directly. The `/demo` file can give you an idea of how to set up all the `./lib` files so that you can manage the game flow and the behaviour of objects in a game stage.

To do:
- Data files should really be json files, now those are .ts because I can't figure out how to feed .json files to TypeScript
- The progress method in the Actor should accept an array of IProgress implementations in stead of just one, so it can stack behaviour so you can make the behaviours smaller, easier to combine and more reusable
- A default direction should be handled by the Generator and should be specifiable in the world editor
