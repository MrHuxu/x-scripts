var console = require('better-console');

var tmp, results = [['a', 'b', 'c', 'd', 'e', 'e && ((a && b && c) || d || !c)', 'e && (a || d || !c) && (b || d || !c) && (c || d || !c)', 'e && (a || d || !c) && (b || d || !c)', 'equal?']];
var test = function (arr) {
  if (!arr) arr = [];

  if (arr.length === 5) {
    var result1 = arr[4] && ((arr[0] && arr[1] && arr[2]) || arr[3] || !arr[2]);
    var result2 = arr[4] && (arr[0] || arr[3] || !arr[2]) && (arr[1] || arr[3] || !arr[2]) && (arr[2] || arr[3] || !arr[2]);
    var result3 = arr[4] && (arr[0] || arr[3] || !arr[2]) && (arr[1] || arr[3] || !arr[2]);
    var equal = (result1 === result2) && (result2 === result3) ? '√' : 'x';
    arr.push(result1, result2, result3, equal);
    results.push(arr);
    return;
  }

  tmp = arr.slice();
  tmp.push(true);
  test(tmp);

  tmp = arr.slice();
  tmp.push(false);
  test(tmp);
}

test();

console.table(results);
