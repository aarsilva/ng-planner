import { Component, OnInit } from '@angular/core';
import { ListResource } from '../shared/list-resource.model';

import { ListsService } from '../shared/lists.service';

@Component({
  selector: 'app-lists-home',
  templateUrl: './lists-home.component.html',
  styleUrls: ['./lists-home.component.css']
})
export class ListsHomeComponent implements OnInit {

  resources: ListResource[] = [];

  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.listsService.getAll().subscribe(
      resources => this.resources = resources.sort((a, b) => a.id - b.id),
      error => alert('Erro ao carregar a lista.')
    )
  }

}
