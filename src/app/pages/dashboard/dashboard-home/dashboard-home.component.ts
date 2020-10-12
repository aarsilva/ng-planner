import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../lists/shared/tasks.service';
import { TaskResource } from '../../lists/shared/task-resource.model';



@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  openTasks: number;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.tasksService.getAll().subscribe((tasks: TaskResource[]) => {
      this.openTasks = tasks.filter((task: TaskResource) => (typeof task.isDone === 'undefined' || task.isDone === false)).length
    })
  }

}
