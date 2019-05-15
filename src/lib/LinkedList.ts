import Node from './Node';

export default class LinkedList {

  private _head: Node;

  constructor() {
    this._head = new Node('head');
  }

  public head() {
    return this._head;
  }

  public first() {
    return this._head.next;
  }

  public find(item) {
    let currNode = this._head;
    while(currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  public insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  public push(newElement) {
    let newNode = new Node(newElement);
    let currNode = this._head;
    while(currNode.next != null) {
      currNode = currNode.next;
    }
    currNode.next = newNode;
  }

  public findPrevious(item) {
    let currNode = this._head;
    while(
      currNode.next !== null &&
      currNode.next.element != item
    ) {
      currNode = currNode.next;
    }
    return currNode;
  }

  public remove(item) {
    let prevNode = this.findPrevious(item);
    if(prevNode !== null) {
      prevNode.next = prevNode.next.next;
    }
  }

  public display() {
    let currNode = this._head;
    while(currNode.next !== null) {
      currNode = currNode.next;
    }
  }
}
