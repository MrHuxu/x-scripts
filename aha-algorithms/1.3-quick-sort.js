'use strict'

var quickSort = function (input) {
  var iterator = function (head, tail) {
    if (head >= tail) return;
    var base = input[head];
    var left = head;
    var right = tail;
    var tmp;

    while (left !== right) {
      while (input[right] >= base && right > left) --right;
      while (input[left] <= base && left < right) ++left;

      if (input[left] > input[right]) {
        tmp = input[left];
        input[left] = input[right];
        input[right] = tmp;
      }
    }

    input[head] = input[left]
    input[left] = base;

    iterator(head, left - 1);
    iterator(left + 1, tail);
  }

  iterator(0, input.length - 1);
};

var input = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
quickSort(input);
console.log(input);