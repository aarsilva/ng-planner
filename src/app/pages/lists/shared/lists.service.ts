import { Injectable, Injector } from '@angular/core';

import { ListResource } from './list-resource.model';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ListsService extends BaseResourceService<ListResource> {

  constructor(protected injector: Injector) {
    super(`${environment.apiUrl}/lists`, injector, ListResource.fromJson);
  }

}
