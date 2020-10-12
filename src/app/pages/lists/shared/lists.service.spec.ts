import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ListsService } from './lists.service';
import { ListResource } from './list-resource.model';
import { environment } from 'src/environments/environment';

describe('ListsService', () => {
  let injector: TestBed;
  let service: ListsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListsService]
    });
    injector = getTestBed();
    service = injector.get(ListsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<ListResource[]>', () => {
    const dummyList: ListResource[] = [
      new ListResource(1, 'Test 1'),
      new ListResource(2, 'Test 2')
    ];

    service.getAll().subscribe((resource: ListResource[]) => {
      expect(resource.length).toBeGreaterThan(0);
      expect(resource).toEqual(dummyList);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/lists`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyList);
  });
});
