// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { AuthModule } from './auth/modules/auth.module';

// Components
import { AppComponent } from './app.component';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SidenavListComponent } from './core/components/sidenav-list/sidenav-list.component';

// Services
import { AuthService } from './auth/services/auth.service';
import { TrainingService } from './training/services/training.service';
import { UIService } from './shared/ui.service';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Environment & Angularfire2 & AngularFireStore
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TrainingModule } from './training/modules/training.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'ng-fitness-tracker'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AuthModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
