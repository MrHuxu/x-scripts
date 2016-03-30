'use strict'

var bucketSort = function (input) {
  var arr = [], output = [];
  for (var i = 0, l = input.length; i < l; ++i) {
    if (!arr[input[i]]) {
      arr[input[i]] = 1;
    } else {
      ++arr[input[i]];
    }
  }

  for (var i = 10; i >= 0; --i) {
    if (arr[i]) {
      for (var j = 0; j < arr[i]; ++j) {
        output.push(i);
      }
    }
  }

  return output;
};

var result = bucketSort([5, 3, 5, 2, 8]);
console.log(result);