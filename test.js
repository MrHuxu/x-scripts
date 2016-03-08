var test = function * () {
  while (true)
    yield 1;
}
var a = test();

console.log(a.next().value);
console.log(a.next().value);
console.log(a.next().value);
