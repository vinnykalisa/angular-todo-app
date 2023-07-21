import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FilterActivePipe } from './pipes/filter-active.pipe';
import { MessageComponent } from './components/message/message.component';
import { TodosPageComponent } from './components/todos-page/todos-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';

const routes: Routes = [
  {path: 'todos/:status', component: TodosPageComponent},
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {path: '**', redirectTo: '/todos/all', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    FilterActivePipe,
    MessageComponent,
    TodosPageComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
