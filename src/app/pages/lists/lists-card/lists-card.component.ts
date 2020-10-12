import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { ListsService } from '../shared/lists.service';
import { TasksService } from '../shared/tasks.service';

import { ListResource } from '../shared/list-resource.model';
import { TaskResource } from '../shared/task-resource.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lists-card',
  templateUrl: './lists-card.component.html',
  styleUrls: ['./lists-card.component.css']
})
export class ListsCardComponent implements OnChanges {

  @Input('data') data: ListResource

  tasks: TaskResource[]
  taskQuantity: number

  submittingForm: boolean

  constructor(
    private router: Router,
    private listsService: ListsService,
    private tasksService: TasksService
  ) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
    const list = changes['data']

    this.tasksService.getAll().subscribe((tasks: TaskResource[]) => {
      this.tasks = tasks.filter((task) => task.listId === list.currentValue.id)
      this.taskQuantity = this.tasks.length
    })
  }

  deleteList(id: number) {
    if (confirm('Deseja realmente deletar esta lista?')) {
      this.submittingForm = true
      const tasksRemoved = this.removeTasks()

      if (tasksRemoved) {
        this.removeList(id)
      }
    }
  }

  protected removeList(id: number) {
    this.listsService.delete(id)
      .subscribe(
        response => this.actionsForSuccess(),
        error => this.actionsForError(error)
      )
  }

  protected removeTasks() {
    if (this.tasks.length > 0) {
      let success = true
      for (let task of this.tasks) {
        this.tasksService.delete(task.id)
          .subscribe(
            response => success,
            error => success = false
          )

          if (!success) {
            alert('Houve um erro ao remover a Lista e suas tarefas.')

            break;
          }
      }

      if (!success)
        return false;
      else
        return true;
    }
  }

  protected actionsForSuccess() {
    alert(`Lista removida com sucesso!`)

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/lists'])
  });
  }


  protected actionsForError(error) {
    alert("Ocorreu um erro ao processar a sua solicitação!")

    this.submittingForm = false

    if (error.status === 422)
      console.log(JSON.parse(error._body).errors)
    else
      console.log("Falha na comunicação com o servidor. Por favor, tente mais tarde.")
  }

}
