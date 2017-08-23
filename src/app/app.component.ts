import { Component, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
      tasksList: Task[] = [];
      singleTask: Task;
      taskName: any;
      editMode: boolean = false;
      constructor(){
        let localItem = localStorage.getItem('task-list');
        if(localItem && localItem.length > 0){
          this.tasksList = JSON.parse(localStorage.getItem('task-list')) as Task[];
        }
      }
      
      createLocalData(event):void {
        if(this.editMode){
          this.tasksList.forEach((task:Task) =>{
            if(this.singleTask == task){
              task.name = this.taskName;
            }
          });
        }
        else{

          let currentId = this.tasksList && this.tasksList.length > 0 ? this.tasksList[this.tasksList.length-1].id + 1  : 1;
          let tempItem = new Task ({
              id: currentId,
              name: this.taskName,
              status: true
          });
          this.tasksList.push(tempItem as Task);
        }
        this.taskName = null;
        this.editMode = false;
        this.dataSorting(this.tasksList);
        localStorage.setItem('task-list', JSON.stringify(this.tasksList));
        this.tasksList = JSON.parse(localStorage.getItem('task-list'));
      }

      activeList():any {
         let data = this.tasksList.filter((item) => item.status == true);
         return this.dataSorting(data);
      }

      completeList():any {
        let data = this.tasksList.filter((item) => item.status == false);
        return this.dataSorting(data);
      }

      dataSorting(data):any {
        return data.sort(function(a, b){
          if( a.name.toLowerCase() > b.name.toLowerCase() ){
            return 1;
          }
          else if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
          }
          else{
            return 0;
          }
        });
      }

      updateTaskStatus(event, inputTask: Task):void {
          this.tasksList.forEach( (task: Task) => {
            if(task == inputTask){
              task.status = !inputTask.status;
            }
          })
          localStorage.setItem('task-list', JSON.stringify(this.tasksList));
      }

      deleteTask(event, task:Task ):void {
        this.tasksList = this.tasksList.filter(item => item !== task);
        localStorage.setItem('task-list', JSON.stringify(this.tasksList));
      }

      editTextWithTask(event, task:Task):void {
          this.singleTask = task;
          this.taskName = this.singleTask.name;
          this.editMode = true;
      }

}

export class Task{
  id: number;
  name: string;
  status: boolean;
  constructor(data: any){
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
  }
}
