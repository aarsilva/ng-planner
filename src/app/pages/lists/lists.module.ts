import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ListsRoutingModule } from './lists-routing.module';
import { ListsHomeComponent } from './lists-home/lists-home.component';
import { ListsCardComponent } from './lists-card/lists-card.component';
import { ListsFormComponent } from './lists-form/lists-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListsHomeComponent, ListsCardComponent, ListsFormComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ListsModule { }
