import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) { }

  openToast(message) {
    this.snackBar.open(message,  null, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
