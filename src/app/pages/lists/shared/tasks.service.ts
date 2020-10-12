import { Injectable, Injector } from '@angular/core';

import { TaskResource } from './task-resource.model';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TasksService extends BaseResourceService<TaskResource> {

  constructor(protected injector: Injector) {
    super(`${environment.apiUrl}/tasks`, injector, TaskResource.fromJson);
  }

}
