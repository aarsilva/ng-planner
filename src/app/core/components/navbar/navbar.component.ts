import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../shared/types/nav-item.type';

@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navItems: NavItem[];

  constructor() {
    this.navItems = [
      {
        ref: 'home',
        link: '/',
        label: 'Início',
      },
      {
        ref: 'lists-home',
        link: '/lists',
        label: 'Listas de Afazeres',
      }
    ]
  }

  ngOnInit(): void {}

}
