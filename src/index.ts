/* This bootstraps and starts off everything */

import Game from './bullet-shooter/Game';
import actorAttributes from './bullet-shooter/actor-attributes';
import Stage from './bullet-shooter/Stage';
import data from './bullet-shooter/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
