// Final part of the binary search tree project

// Tie it all together... Write a driver script that does the following:

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
// a. Create a random array:
function randomArr() {
    return Array.from({length: 15}, () => Math.floor(Math.random() * 100));
};

let initialArray = randomArr();

// b. Sort the array and remove duplicate values:
function sortArray(array) {
    let sortedArr = array.sort(function(a, b){return a - b}); // sorts
    let removeDupsArr = [...new Set(sortedArr)]; // removes duplicates
    return removeDupsArr;
};
// c. Build the binary search tree (using functions above):
class Node {
    constructor(key)
    {
        this.key = key;
        this.left = null;
        this.right = null;
    }
};

function buildTree(array, start, end) {

    if (start > end)
        {
            return null;
        }

    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);

    // Recursively construct the left subtree and make it left child of root
    node.left = buildTree(array, start, mid - 1);
    // Recursively construct the right subtree and make it right child of root
    node.right = buildTree(array, mid + 1, end);

    return node;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.key}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};    

// Calling functions above to build tree:
// let unsortedArray = randomArr(); -- this creates a new array each time
let sortedArray = sortArray(initialArray);
let len = sortedArray.length;
let root = null;
root = buildTree(sortedArray, 0, len - 1);
// Print array to preview:
prettyPrint(root);

// 2. Confirm that the tree is balanced by calling isBalanced.
function height(node) {
    if (node == null)
        {
            return -1;
        }
    else
    {
        // compute the depth of each subtree
        let lDepth = height(node.left);
        let rDepth = height(node.right);

        // use the larger one
        if (lDepth > rDepth) {
            return (lDepth + 1);
        }
        else {
            return (rDepth + 1);
        }
    }
};

function isBalanced(root) {
    // Base condition
    if(root == null) {
        return true;
    }

    // for left and right subtree height
    let lh = height(root.left)
    let rh = height(root.right)

    // allowed values for (lh - rh) are 1, -1, 0
    if (Math.abs(lh - rh) <= 1 && isBalanced(root.left) == true && isBalanced(root.right) == true) {
        return true;
    }

    // if we reach here means tree is not height-balanced tree:
    return false;
};

// console.log('The tree is balanced: ' + isBalanced(root));

// 3. Print out all elements in level, pre, post, and in order.
function levelOrder(root) {
    if (!root) return;

    let arr = [];
    arr.push(root);

    while (arr.length > 0) {
        let node = arr.shift();
        console.log(node.key + " ");

        if (node.left) {
            arr.push(node.left);
        }
        if (node.right) {
            arr.push(node.right);
        }  
    }
};

// levelOrder(root);


function preOrder(node)
{
    if (node == null)
    {
        return;
    }
    console.log(node.key + " ");
    preOrder(node.left);
    preOrder(node.right);
};

// preOrder(root);


function postOrder(node)
{
    if (node == null)
    {
        return;
    }
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.key + " ");
};

// postOrder(root);


function inorder(root) {
    if (root !== null) {
        inorder(root.left);
        console.log(root.key + " ");
        inorder(root.right);
    }
};

// inorder(root);

// 4. Unbalance the tree by adding several numbers > 100.
root.right.right.right.right = new Node(101);
root.right.right.right.right.right = new Node(102);
root.right.right.right.right.right.right = new Node(103);
prettyPrint(root);

// 5. Confirm that the tree is unbalanced by calling isBalanced.
console.log('The tree is balanced: ' + isBalanced(root));

// 6. Balance the tree by calling rebalance.
function levelOrderToArr(node) {
    const nodes = [];

    if (node !== null) {
      nodes.push(
        ...levelOrderToArr(node.left),
        node.key,
        ...levelOrderToArr(node.right)
      );
    }
    return nodes;
};

function rebalance(root) {
    // traverse tree inorder() and push to new array
    let arr1 = levelOrderToArr(root);
    
    // rebuild with buildTree()...
    let arr2 = sortArray(arr1);
    let len = arr2.length;
    let rebalancedRoot = buildTree(arr2, 0, len - 1);
    return rebalancedRoot;
};

let newRoot = rebalance(root);
prettyPrint(newRoot);

// 7. Confirm that the tree is balanced by calling isBalanced.
console.log('The tree is balanced: ' + isBalanced(newRoot));

// 8. Print out all elements in level, pre, post, and in order.
// levelOrder(newRoot);
// preOrder(newRoot);
// postOrder(newRoot);
inorder(newRoot);