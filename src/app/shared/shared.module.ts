import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormErrorMessageComponent } from './components/form-error-message/form-error-message.component';

@NgModule({
  declarations: [PageHeaderComponent, FormErrorMessageComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    PageHeaderComponent,
    FormErrorMessageComponent
  ]
})
export class SharedModule { }
