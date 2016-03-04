'use strict'

import http from 'http';
import cheerio from 'cheerio';
import inquirer from 'inquirer';
import console from 'better-console';

const rootPath = 'http://g.hupu.com'

http.get(rootPath + '/nba/', (res) => {
  var data = ''
  res.on('data', chunk => data += chunk);

  res.on('end', () => {
    var $ = cheerio.load(data);
    var teamLinks = $('.border_a').find('span > a');
    var scoresTexts = $('span.num');
    var games = [];
    for (let i = 0, l = teamLinks.length; i < l; ++i) {
      if (i % 2 === 0) {
        games[i / 2] = {teams: [], scores: []};
        games[i / 2].link = $('.border_a').find('a.b')[i / 2].attribs.href;
        games[i / 2].scores[0] = $('span.num')[i].children[0].data;

        games[i / 2].teams[0] = teamLinks[i].children[0].data;
      } else {
        games[(i - 1) / 2].teams[1] = teamLinks[i].children[0].data;
        games[(i - 1) / 2].scores[1] = $('span.num')[i].children[0].data;
      }
    }

    var choices = games.map(game => `${game.teams[0]}(${game.scores[0]}) vs. (${game.scores[1]})${game.teams[1]}`);
    inquirer.prompt([{
      type      : "list",
      name      : "game",
      message   : "What's your favorite letter?",
      paginated : true,
      choices   : choices
    }], function (answers) {
      var gameIndex = choices.indexOf(answers.game);

      http.get(rootPath + games[gameIndex].link, (res) => {
        var data = '';
        res.on('data', chunk => data += chunk);

        res.on('end', () => {
          var $ = cheerio.load(data);
          var rows = $($('.table_list_live')[1]).find('tr');
          var cols = [];
          for (let i = rows.length - 10, l = rows.length; i < l; ++i) {
            if (rows[i].children[1].children[0].children) {
              cols.push({
                time   : '',
                team   : '',
                record : rows[i].children[1].children[0].children[0].data.trim(),
                score  : ''
              });
            } else {
              cols.push({
                time   : rows[i].children[1].children[0].data.trim(),
                team   : rows[i].children[3].children[0].data.trim(),
                record : rows[i].children[5].children[0].data.trim(),
                score  : rows[i].children[7].children[0].data.trim()
              });
            }
          }
          console.table(cols);
        })
      })
    });
  });
});
