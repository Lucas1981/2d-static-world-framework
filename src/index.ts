/* This bootstraps and starts off everything */

import Game from './demo/Game';
import actorAttributes from './demo/actor-attributes';
import Stage from './demo/Stage';
import data from './demo/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
