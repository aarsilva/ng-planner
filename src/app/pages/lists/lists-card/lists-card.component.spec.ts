import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { ListsCardComponent } from './lists-card.component';
import { ListsService } from '../shared/lists.service';
import { MockListsService } from '../shared/lists.service.mock';

describe('ListsCardComponent', () => {
  let component: ListsCardComponent;
  let listsService: ListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ListsCardComponent,
        { provide: ListsService, useClass: MockListsService },
      ]
    });

    component = TestBed.inject(ListsCardComponent);
    listsService = TestBed.inject(ListsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
