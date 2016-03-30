'use strict'

var bubbleSort = function (input, field) {
  var len = input.length;
  var tmp;
  for (var i = 0; i < len - 1; ++i) {
    for (var j = 0; j < len - 1 - i; ++j) {
      if (field) {
        if (input[j][field] > input[j + 1][field]) {
          tmp = input[j];
          input[j] = input[j + 1];
          input[j + 1] = tmp;
        }
      } else {
        if (input[j] > input[j + 1]) {
          tmp = input[j];
          input[j] = input[j + 1];
          input[j + 1] = tmp;
        }
      }
    }
  }

  return input;
};

var input1 = [8, 100, 50, 22, 15, 6, 1, 1000, 999, 0];
bubbleSort(input1);
console.log(input1);

var input2 = [{
  score : 75,
  name  : 'xhu'
}, {
  score : 92,
  name  : 'yqh'
}, {
  score : 67,
  name  : 'mtl'
}];
bubbleSort(input2, 'score');
console.log(input2);