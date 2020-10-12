import { ListResource } from './list-resource.model';

export class MockListsService {
  dummyList = [
    { id: 1, title: 'Test 1' },
    { id: 2, title: 'Test 2' },
  ];

  constructor() { }

  getAll() {
    return ListResource.fromJson(this.dummyList)
  }

  getById(id: number) {
    return ListResource.fromJson({ id: 1, title: 'Test 1' })
  }
}
