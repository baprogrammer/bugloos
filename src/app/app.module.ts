import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    EditUserComponent,
    SideNavigationComponent,
    BreadCrumbComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule ,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
