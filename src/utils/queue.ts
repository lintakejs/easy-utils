export class Queue {
  private list: Array<any> = []

  private MaxLength: number

  constructor (size: number) {
    this.MaxLength = size
    this.list = []
  }

  public get size() {
    return this.list.length
  }

  public get quere(): Array<any> {
    return this.list
  }

  /**
   * 队列添加数据
   * @param data 要添加的数据
   */
  public push(data: any) {
    if (this.size === this.MaxLength) {
      this.pop()
    }

    this.list.unshift(data)
  }

  /**
   * @description 队列取出数据
   */
  public pop() {
    return this.list.pop()
  }

  /**
   * @description 清除队列
   */
  public clear() {
    this.list = []
  }
}
