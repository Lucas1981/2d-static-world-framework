export default class Node {

  public next: Node;

  constructor(
    public element: any
  ) {
    this.next = null;
  }
}
