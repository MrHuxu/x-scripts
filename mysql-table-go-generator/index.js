var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fwmrm_oltp'
});

connection.connect();

var Table = function (name) {
  this.tableName = name;
};

Table.prototype.traverseFields = function () {
  connection.query(`DESCRIBE ${this.tableName}`, (err, rows, fields) => {
    if (err) console.log(err);

    console.log(rows.reduce((prev, curr) => {
      prev[curr.Field] = curr.Type;
      return prev;
    }, {}));
  });
};

Table.prototype.generate = function () {
  this.traverseFields();
};

var fetchTables = new Promise((resolve, reject) => {
  connection.query('SHOW TABLES', (err, rows, fields) => {
    if (err) {
      resolve([]);
    } else {
      resolve(rows.map(row => row.Tables_in_fwmrm_oltp));
    }
  });
});

fetchTables.then(tableNames => {
  tableNames.forEach(name => {
    var t = new Table(name);
    t.generate();
  })
  connection.end();
})
