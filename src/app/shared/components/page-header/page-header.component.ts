import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

interface iActionButton {
  text: string;
  icon: string;
  link: string;
  hidden?: boolean;
}

@Component({
  selector: 'shared-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnChanges {

  @Input('action') action: iActionButton = {
    text: '',
    icon: '',
    link: '',
  };
  @Input('title') title: string;

  header: any;

  constructor() { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
    const action = changes['action'].currentValue
    const title = changes['title'].currentValue

    this.header = {
      title,
      action
    }
  }

}
