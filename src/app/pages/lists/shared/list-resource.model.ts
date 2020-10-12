import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class ListResource extends BaseResourceModel {

  constructor(
    public id?:number,
    public title?: string,
  ){
    super();
  }

  static fromJson(jsonData: any): ListResource {
    return Object.assign(new ListResource(), jsonData);
  }

}
