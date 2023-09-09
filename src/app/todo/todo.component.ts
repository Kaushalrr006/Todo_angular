import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks: ITask[] =[];
  inprogress :ITask[]=[];
  done :ITask[]=[];
  updateIndex!:any;
  isEditEnabled:boolean=false;
  constructor(private fb : FormBuilder )
  {

  }

  ngOnInit(): void{
    this.todoForm = this.fb.group({
      item : ['',Validators.required]
    })
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
    this.isEditEnabled = false; // Disable edit mode
  }

  updateTask() {
    if (this.updateIndex !== undefined) {
      this.tasks[this.updateIndex].description = this.todoForm.value.item;
      this.todoForm.reset();
      this.isEditEnabled = false; // Disable edit mode
      this.updateIndex = undefined; // Reset the update index
    }

  }
  
  deleteTask(i :number){
    this.tasks.splice(i,1)
  }
  deleteInProgressTask(i :number){
    this.inprogress.splice(i,1)
  }

  deleteDoneTask(i :number){
    this.done.splice(i,1)
  }
  onEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true; // Enable edit mode
  }

  // updateTask() {
  //   if (this.updateIndex !== undefined) {
  //     this.tasks[this.updateIndex].description = this.todoForm.value.item;
  //     this.todoForm.reset();
  //     this.isEditEnabled = false; // Disable edit mode
  //     this.updateIndex = undefined; // Reset the update index
  //   }
  // }


  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}