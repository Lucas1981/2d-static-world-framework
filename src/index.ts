/* This bootstraps and starts off everything */

import Game from './resources/Game';
import actorAttributes from './resources/actor-attributes';
import Stage from './resources/Stage';
import data from './resources/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
