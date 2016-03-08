'use strict'

import inquirer from 'inquirer';
import FetchGames from './fetch-games';
import FetchGameRecords from './fetch-game-records';

FetchGames.then((games) => {
  var choices = games.map(game => `${game.teams[0]}(${game.scores[0]}) vs. (${game.scores[1]})${game.teams[1]}`);
  return new Promise((resolve, reject) => {
    inquirer.prompt([{
      type      : "list",
      name      : "game",
      message   : "Choose a game",
      paginated : true,
      choices   : choices
    }], function (answers) {
      var index = choices.indexOf(answers.game);
      resolve(games[index].link);
    });
  });
}).then((url) => {
  return FetchGameRecords(url);
}).then((records) => {
  var choices = records.map((record) => `${record.time} ${record.team} ${record.record} ${record.score}`)
  inquirer.prompt([{
    type      : "list",
    name      : "game",
    message   : "Here are the game records",
    paginated : true,
    choices   : choices.reverse()
  }]);
});