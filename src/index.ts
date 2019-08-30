/* This bootstraps and starts off everything */

import Game from './sarah/Game';
import actorAttributes from './sarah/actor-attributes';
import Stage from './sarah/Stage';
import data from './sarah/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
