import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ROUTES } from './routes/routes';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthedGuard } from './guards/authed.guard';
import { NotifyComponent } from './notify/notify.component';
import { NotifyService } from './services/notify.service';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './services/user.service';
import { PrettyDatePipe } from './pipes/pretty-date.pipe';
import { WallComponent } from './profile/wall/wall.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { FollowComponent } from './profile/follow/follow.component';
import { FollowService } from './services/follow.service';
import { CreateJokeComponent } from './create-joke/create-joke.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    NotifyComponent,
    ProfileComponent,
    PrettyDatePipe,
    WallComponent,
    EditProfileComponent,
    FollowComponent,
    CreateJokeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule,
    NgProgressModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard,AuthedGuard,NotifyService,UserService,FollowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
