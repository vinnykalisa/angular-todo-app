import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const todos = [
  {
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
  },

  {
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false,
  },

  {
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false,
  },

  {
    "id": 4,
    "title": "et porro tempora",
    "completed": true,
  }
];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  editing = false;
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
  });

get title() {
  return this.todoForm.get('title') as FormControl;
}

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }

  get activeTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  addTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value,
      completed: false,
    };

    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}
