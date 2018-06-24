import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';

import { TrainingService } from '../../training/services/training.service';
import { UIService } from '../../shared/ui.service';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubs();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(() => {
      this.uiService.openToast('Successfully registered user!');
      this.uiService.loadingStateChanged.next(false);
    })
    .catch((error: Error) => {
      this.uiService.openToast(error.message);
      this.uiService.loadingStateChanged.next(false);
    });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then( () => {
      this.uiService.openToast('Successfully logged in!');
      this.uiService.loadingStateChanged.next(false);
    })
    .catch( (e: Error) => {
      this.uiService.openToast(e.message);
      this.uiService.loadingStateChanged.next(false);
    });

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
