/* This bootstraps and starts off everything */

import Game from './capture-the-flag/Game';
import actorAttributes from './capture-the-flag/actor-attributes';
import Stage from './capture-the-flag/Stage';
import data from './capture-the-flag/data';

(function(Game, Stage, actorAttributes, data) {
  const stage = new Stage();
  const game = new Game(stage);
  game.run(data, actorAttributes);
})(Game, Stage, actorAttributes, data);
