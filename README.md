# Grid demo

So, this is a demo to see how you can build a game engine with JavaScript for the browser, making use of a grid map. To make the game and manage the resources with, I've used my world maker, which can be found on:

https://github.com/Lucas1981/world-maker

Export the file you make with the editor, turn it into a TypeScript `.ts` file (also adding `export default` to the beginning of the file - still have to get the json import to work) and you can use your frames, animations, tiles, actors, maps and sounds directly. The `/demo` file can give you an idea of how to set up all the `./lib` files so that you can manage the game flow and the behaviour of objects in a game stage.

To do:
- Data files should really be json files, now those are .ts because I can't figure out how to feed .json files to TypeScript
- The text written to the bottom of the screen takes up a lot of repetitive code. A standard and reusable implementation can be added to the resources folder.
- The text written to the bottom of the screen should perhaps be the responsibility of the Game loop and not of the State handler. The Game handler might not know what to display though, so perhaps there should be a communication channel established between the Game and the mainLoop implementation.
- The progress method in the Actor should accept an array of IProgress implementations in stead of just one, so it can stack behaviour so you can make the behaviours smaller, easier to combine and more reusable
- A default direction should be handled by the Generator.
