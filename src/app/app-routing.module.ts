import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFormComponent } from './pages/forms/edit-form/edit-form.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';


import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'users', component: UserListComponent } ,
  { path: 'user/edit', component: EditUserComponent } ,
  { path: 'user/edit/:id', component: EditUserComponent } ,
  { path: 'form/edit', component: EditFormComponent } ,
  { path: 'form/edit/:id', component: EditFormComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
