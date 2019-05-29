/* This bootstraps and starts off everything */

import Game from './fighting-interaction/Game';
import actorAttributes from './fighting-interaction/actor-attributes';
import Stage from './fighting-interaction/Stage';
import data from './fighting-interaction/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
