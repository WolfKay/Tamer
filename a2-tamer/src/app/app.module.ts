import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import './rxjs.operators';
import { RecsComponent } from './recs/recs.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'user', component: UserComponent},
  { path: 'recs', component: RecsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    RecsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ AuthService, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
