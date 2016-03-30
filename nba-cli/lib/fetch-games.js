'use strict'

import http from 'http';
import cheerio from 'cheerio';

const rootPath = 'http://g.hupu.com';

export default new Promise((resolve, reject) => {
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

      resolve(games);
    });
  });
});