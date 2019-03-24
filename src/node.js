class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (this.left && !this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error("passed node is not a child of this node");
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		//does nothing if node does not have parent
		if (this.parent) {
			let parent = this.parent;
			if (this.parent.parent) {
				let root = this.parent.parent;
				this.parent = root; //updates child.parent (this.parent)
				//maintains correct state of parent.parent.left and parent.parent.right
				if (root.left === parent) {
					root.left = this;
				} else if (root.right === parent) {
					root.right = this;
				}
			}
			parent.parent = this; //updates parent.parent
			//updates parent.child.parent
			if (parent.right === this && parent.left) {
				parent.left.parent = this;
			} else if (parent.left === this && parent.right) {
				parent.right.parent = this;
			}
			//updates parents of children of node
			if (this.left) {
				this.left.parent = parent;
			}
			if (this.right) {
				this.right.parent = parent;
			}
			//updates children of node and parent node
			let leftChild = parent.left;
			let rightChild = parent.right;
			parent.left = this.left;
			parent.right = this.right;
			if (leftChild === this) {
				this.right = rightChild;
				this.left = parent;
			} else if (rightChild === this) {
				this.left = leftChild;
				this.right = parent;
			}
		}
	}
}

module.exports = Node;