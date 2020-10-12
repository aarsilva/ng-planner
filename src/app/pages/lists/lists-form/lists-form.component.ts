import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";

import { ListResource } from '../shared/list-resource.model';
import { ListsService } from '../shared/lists.service';

import { TaskResource } from '../shared/task-resource.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-lists-form',
  templateUrl: './lists-form.component.html',
  styleUrls: ['./lists-form.component.css']
})
export class ListsFormComponent implements OnInit {

  id?: number
  listResource: ListResource
  taskResource: TaskResource
  tasksResource: TaskResource[]

  resourceForm: FormGroup
  listResourceForm: FormGroup
  taskResourceForm: FormGroup
  tasksResourceArray: FormArray

  currentAction: string
  serverErrorMessages: string[] = null
  submittingForm: boolean = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private listsService: ListsService,
    private tasksService: TasksService,

    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const { params } = this.activatedRoute
    this.buildResourceForm()

    params.subscribe(data => {
      if (typeof data.id !== 'undefined' && data.id !== null) {
        this.id = data.id
        this.currentAction = 'edit'

        this.listsService.getById(data.id).subscribe(
          resource => {
            this.listResource = resource
            this.findTasks(resource.id)
          },
          error => {
            alert('Erro ao procurar a lista.')
            this.router.navigate(['/lists'])
          }
        )
      } else {
        this.currentAction = 'new'
      }
    })
  }

  findTasks(listId: number) {
    if(!listId)
      return false

    this.tasksService.getAll().subscribe(
      resource => {
        this.tasksResource = resource.filter(task => task.listId === listId)

        this.setValueOnForm();
      },
      error => {
        alert('Erro ao procurar as tarefas da lista.')
        this.router.navigate(['/lists'])
      }
    )

    return true;
  }

  newTask() {
    this.tasks.push(this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(2)]],
      isDone: [false],
      isDeleted: [false],
    }))
  }

  submitForm() {
    this.submittingForm = true;

    if(this.currentAction == "new")
      this.createList();
    else
      this.updateList();
  }

  changeTaskToDelete(index: number) {
    if (this.tasks.controls[index]) {
      const task = this.tasks.controls[index].value

      if (task.id !== null) {
        this.tasks.controls[index].patchValue({
          isDeleted: true,
        })
      } else {
        this.tasks.removeAt(index)
      }
    }

    console.log(this.tasks.controls.length)
  }

  public get tasks() {
    return this.resourceForm.get('tasks') as FormArray;
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      list: this.formBuilder.group({
        id: [null],
        title: [null, [Validators.required, Validators.minLength(2)]],
      }),
      tasks: this.formBuilder.array([]),
    })
  }

  protected setValueOnForm() {
    let array = [];

    this.resourceForm.patchValue({
      list: this.listResource,
    })

    for (let task of this.tasksResource) {
      const form = this.formBuilder.group({
        id: [null],
        title: [null, [Validators.required, Validators.minLength(2)]],
        isDone: [false],
        isDeleted: [false]
      })

      form.patchValue({
        id: task.id,
        title: task.title,
        isDone: task.isDone
      })

      this.tasks.push(form)
    }
  }

  protected createList() {
    const resource: ListResource = ListResource.fromJson(this.resourceForm.get('list').value);
    console.log('List: ', resource)

    this.listsService.create(resource)
      .subscribe(
        response => this.handleTasks(response),
        error => this.actionsForError(error)
      )
  }

  protected updateList() {
    const resource: ListResource = ListResource.fromJson(this.resourceForm.get('list').value);

    this.listsService.update(resource)
      .subscribe(
        response => this.handleTasks(response),
        error => this.actionsForError(error)
      )
  }

  protected handleTasks(listResource: ListResource) {
    const array = this.resourceForm.get('tasks').value
    const tasksToCreate: TaskResource[] = []
    const tasksToUpdate: TaskResource[] = []
    const tasksToDelete: TaskResource[] = []

    let successCreate = true
    let successUpdate = true
    let successDelete = true


    for (let task of array) {
      task.listId = listResource.id
      const resource: TaskResource = TaskResource.fromJson(task)

      if (task.isDeleted) {
        tasksToDelete.push(resource)
      } else if (resource.id !== null) {
        tasksToUpdate.push(resource)
      } else {
        tasksToCreate.push(resource)
      }
    }

    if (tasksToCreate.length > 0) {
      successCreate = this.createTasks(tasksToCreate)
    }

    if (tasksToUpdate.length > 0) {
      successUpdate = this.updateTasks(tasksToUpdate)
    }

    if (tasksToDelete.length > 0) {
      successDelete = this.removeTasks(tasksToDelete)
    }

    if (successDelete && successUpdate && successCreate) {
      this.actionsForSuccess()
    }

  }

  protected createTasks(tasks: TaskResource[]) {
    let success = true

    for (let task of tasks) {
      this.tasksService.create(task)
        .subscribe(
          response => console.log('Task: ', response),
          error => {
            this.actionsForError(error)
            success = false
          }
        )

        if (!success) {
          return false
        }
    }

    return true
  }

  protected updateTasks(tasks: TaskResource[]) {
    let success = true

    for (let task of tasks) {

      this.tasksService.update(task)
        .subscribe(
          response => console.log('Task: ', response),
          error => {
            this.actionsForError(error)
            success = false
          }
        )

        if (!success) {
          return false
        }
    }

    return true
  }

  protected removeTasks(tasks: TaskResource[]) {
    let success = true
    for (let task of tasks) {
      this.tasksService.delete(task.id)
          .subscribe(
            response => success,
            error => success = false
          )

          if (!success) {
            alert('Houve um erro ao remover a Lista e suas tarefas.')

            break;
          }

      if (!success)
        return false;
      else
        return true;
    }
  }


  protected actionsForSuccess() {
    alert(`Lista ${this.currentAction === 'new' ? 'cadastrada' : 'atualizada'} com sucesso!`)

    this.router.navigate(['/lists'])
  }


  protected actionsForError(error) {
    alert("Ocorreu um erro ao processar a sua solicitação!")

    this.submittingForm = false

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
  }

}
