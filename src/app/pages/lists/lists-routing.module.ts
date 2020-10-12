import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsFormComponent } from './lists-form/lists-form.component';
import { ListsHomeComponent } from './lists-home/lists-home.component';

const routes: Routes = [
  {
    path: '',
    component: ListsHomeComponent,
  },
  {
    path: 'new',
    component: ListsFormComponent,
  },
  {
    path: 'edit/:id',
    component: ListsFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
