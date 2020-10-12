export class TaskResource {
  constructor(
    public id?:number,
    public listId?: number,
    public title?: string,
    public isDone?: boolean
  ){ }

  static fromJson(jsonData: any): TaskResource {
    return Object.assign(new TaskResource(), jsonData);
  }
}
