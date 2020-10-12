import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.css']
})
export class FormErrorMessageComponent implements OnChanges {

  @Input('formControl') formControl: FormControl;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {}

  public get errorMessage(): string | null {
    if( this.mustShowErrorMessage() )
      return this.getErrorMessage();
    else
      return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage(): string | null {
    if(this.formControl.errors.required)
      return "O campo é obrigatório.";

    else if(this.formControl.errors.minlength){
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `O campo deve ter no mínimo ${requiredLength} caracteres`;
    }

    else if(this.formControl.errors.maxlength){
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `O campo deve ter no máximo ${requiredLength} caracteres`;
    }
  }

}
