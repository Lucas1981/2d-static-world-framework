/* This bootstraps and starts off everything */

import Game from './push-interaction/Game';
import actorAttributes from './push-interaction/actor-attributes';
import Stage from './push-interaction/Stage';
import data from './push-interaction/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
