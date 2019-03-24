const Node = require("./node");

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.size = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.size++;
	}

	pop() {
		this.size--;
	}

	detachRoot() {}

	restoreRootFromLastInsertedNode(detached) {}

	size() {
		return this.size;
	}

	isEmpty() {
		if (this.root) return false;
		else return true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.size = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			node.swapWithParent();
			let nodeIndex = this.parentNodes.indexOf(node);
			let parentIndex = this.parentNodes.indexOf(node.parent);
			if (nodeIndex >= 0) this.parentNodes[nodeIndex] = node.parent;
			if (parentIndex >= 0) this.parentNodes[parentIndex] = node;
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {}
}

module.exports = MaxHeap;