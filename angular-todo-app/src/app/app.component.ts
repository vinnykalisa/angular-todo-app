import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';

const todosFromServer = [
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
_todos: Todo[] = [];
activeTodos: Todo[] = [];

get todos() {
  return this._todos;
}

set todos(todos: Todo[]) {
  if (todos === this._todos) {
    return;
  }

  this._todos = todos;
  this.activeTodos = this._todos.filter(todo => !todo.completed);
}

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
  });

  ngOnInit(): void {
    this.todos = todosFromServer;
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };

    this.todos = [...this.todos, newTodo];
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });
  }

  renameTodo(todoId: number, title: string) {
    this.todos.map(todo => {
      if (todo.id === todoId) {
        return todo;
      }

      return { ...todo, title };
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }
}
