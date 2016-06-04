const BinaryTreeNode = require('./binary-tree');


// function BinarySearchTree (value) {
//     BinaryTree.call(this, value);
// }
// BinarySearchTree.prototype = Object.create(BinaryTree.prototype);

var insert = (root, node) => {
  var y = null, x = root;
  while (x) {
    y = x;
    if (node.data < x.data)
      x = x.left;
    else
      x = x.right;
  }
  node.prev = y;
  if (node.data < y.data)
    y.left = node;
  else
    y.right = node;
}

var n1 = new BinaryTreeNode(12);
var n2 = new BinaryTreeNode(5);
var n3 = new BinaryTreeNode(18);
var n4 = new BinaryTreeNode(2);

insert(n1, n2);
insert(n1, n3);
insert(n1, n4);
console.log(n1);