import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListsFormComponent } from './lists-form.component';
import { ListsService } from '../shared/lists.service';
import { MockListsService } from '../shared/lists.service.mock';
import { FormBuilder } from '@angular/forms';

describe('ListsFormComponent', () => {
  let component: ListsFormComponent;
  let listsService: ListsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ListsFormComponent,
        FormBuilder,
        { provide: ListsService, useClass: MockListsService }
      ]
    });

    component = TestBed.inject(ListsFormComponent);
    listsService = TestBed.inject(ListsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
