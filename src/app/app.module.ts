import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';

import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { KiramenekoiComponent } from './kiramenekoi/kiramenekoi.component';
import { PlaceComponent } from './place/place.component';
import { UserService } from './service/user.service';
import { AddItemComponent } from './item/add-item/add-item.component';
import { ItemService } from './service/item.service';
import { ItemListComponent } from './item/item-list/item-list.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AgmCoreModule } from '@agm/core';
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { ActivitiesListComponent } from './activities/activities-list/activities-list.component';
import { ActivityService } from './service/activity.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent},
  { path: 'kiRameneKoi', canActivate:[AuthGuardService], component: KiramenekoiComponent},
  { path: 'place', canActivate:[AuthGuardService], component: PlaceComponent},
  { path: 'activities', canActivate:[AuthGuardService], component: ActivitiesListComponent},
  { path: 'add-activity', canActivate:[AuthGuardService], component: AddActivityComponent},
  { path: 'add-item', canActivate:[AuthGuardService], component: AddItemComponent},
  { path: '', redirectTo: '/kiRameneKoi', pathMatch: 'full' },
  { path: '**', redirectTo: 'kiRameneKoi' }
];

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    KiramenekoiComponent,
    PlaceComponent,
    AddItemComponent,
    ItemListComponent,
    ForgotPasswordComponent,
    AddActivityComponent,
    ActivitiesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'key'
    })
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserService,
    ItemService,
    AngularFireDatabase,
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
