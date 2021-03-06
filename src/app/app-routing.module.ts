import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';
import { EditFormComponent } from './pages/forms/edit-form/edit-form.component';
import { FormListComponent } from './pages/forms/form-list/form-list.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { FormsComponent } from './pages/users/forms/forms.component';
import { LoginComponent } from './pages/users/login/login.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';


import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'select', component: MultipleSelectComponent },
  { path: 'users', component: UserListComponent } ,
  { path: 'user/edit', component: EditUserComponent } ,
  { path: 'user/edit/:id', component: EditUserComponent } ,
  { path: 'form/edit', component: EditFormComponent } ,
  { path: 'form/edit/:id', component: EditFormComponent } ,
  { path: 'forms', component: FormListComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'user/forms', component: FormsComponent } ,
  { path: 'user/form/:id', component: UserFormComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
