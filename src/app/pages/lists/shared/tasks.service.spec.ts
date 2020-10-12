import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TasksService } from './tasks.service';
import { TaskResource } from './task-resource.model';
import { environment } from 'src/environments/environment';

describe('ListsService', () => {
  let injector: TestBed;
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });
    injector = getTestBed();
    service = injector.get(TasksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<TaskResource[]>', () => {
    const dummyTasks: TaskResource[] = [
      new TaskResource(1, 1, 'Test 1', true),
      new TaskResource(2, 1, 'Test 1', false),
      new TaskResource(3, 2, 'Test 2', false)
    ];

    service.getAll().subscribe((resource: TaskResource[]) => {
      expect(resource.length).toBeGreaterThan(0);
      expect(resource).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyTasks);
  });
});
