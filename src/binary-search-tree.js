const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this._root === null) {
      this._root = newNode;
    } else {
      let currentNode = this._root;
      while (true) {
        if (data < currentNode.data) {
          if (currentNode.left === null) {
            currentNode.left = newNode;
            break;
          } else {
            currentNode = currentNode.left;
          }
        } else {
          if (currentNode.right === null) {
            currentNode.right = newNode;
            break;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }
  }

  has(data) {
    let currentNode = this._root;

    while (currentNode !== null) {
      if (data === currentNode.data) {
        return true;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  find(data) {
    let currentNode = this._root;

    while (currentNode !== null) {
      if (data === currentNode.data) {
        return currentNode;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // Удаление узла с двумя детьми
        if (node.left !== null && node.right !== null) {
          const minRightNode = this.minNode(node.right);
          node.data = minRightNode.data;
          node.right = removeNode(node.right, minRightNode.data);
          return node;
        }

        // Удаление узла с одним ребенком или без детей
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
      }
    };

    this._root = removeNode(this._root, data);
  }

  minNode(node) {
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    let currentNode = this._root;
    while (currentNode !== null && currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode ? currentNode.data : null;
  }

  max() {
    let currentNode = this._root;
    while (currentNode !== null && currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode ? currentNode.data : null;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

module.exports = {
  BinarySearchTree
};