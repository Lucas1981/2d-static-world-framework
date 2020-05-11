/* This bootstraps and starts off everything */

import Game from './worst-game-ever/Game';
import actorAttributes from './worst-game-ever/actor-attributes';
import Stage from './worst-game-ever/Stage';
import data from './worst-game-ever/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
