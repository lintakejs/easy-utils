class Node<T> {
  private nodeData: T

  constructor(nodeData: T) {
    this.nodeData = nodeData
    this.next = null
  }

  /**
   * 设置指针指向的节点
   * @param node 链式栈下一份连接节点
   */
  public set next(node: Node<T> | null) {
    this.next = node
  }

  /**
   * @description 获取指针指向的节点
   */
  public get next() {
    return this.next
  }
}

export class LinkedStack {
  private length = 0

  private topNode!: Node<any> | undefined

  public get size() {
    return this.length
  }

  public get top() {
    return this.topNode
  }

  /**
   * 入栈
   * @param nodeData 节点数据
   */
  public push(nodeData: any) {
    const node = new Node(nodeData)
    if (this.topNode) {
      node.next = this.topNode
    }
    this.topNode = node
    this.length = this.length + 1
  }

  public pop() {
    const currentNode = this.topNode

    if (currentNode) {
      this.topNode = currentNode
      currentNode.next = null
      this.length = this.length - 1
      return currentNode
    } else {
      return undefined
    }
  }

  public clear() {
    this.length = 0
    this.topNode = undefined
  }
}
