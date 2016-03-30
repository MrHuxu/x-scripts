'use strict'

import http from 'http';
import cheerio from 'cheerio';

const rootPath = 'http://g.hupu.com';

export default function (path) {
  return new Promise((resolve, reject) => {
    http.get(rootPath + path, (res) => {
      var data = '';
      res.on('data', chunk => data += chunk);

      res.on('end', () => {
        var $ = cheerio.load(data);
        var rows = $($('.table_list_live')[1]).find('tr');
        var records = [];
        for (let i = 0, l = rows.length; i < l; ++i) {
          if (rows[i].children[1].children[0].children) {
            records.push({
              time   : '',
              team   : '',
              record : rows[i].children[1].children[0].children[0].data.trim(),
              score  : ''
            });
          } else {
            records.push({
              time   : rows[i].children[1].children[0].data.trim(),
              team   : rows[i].children[3].children[0].data.trim(),
              record : rows[i].children[5].children[0].data.trim(),
              score  : rows[i].children[7].children[0].data.trim()
            });
          }
        }

        resolve(records);
      });
    });
  });
}