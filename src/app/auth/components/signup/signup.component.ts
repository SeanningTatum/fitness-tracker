import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../services/auth.service';
import { UIService } from '../../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date;
  isLoading: Boolean = false;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.subscription = this.uiService.loadingStateChanged
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
    // Set the max date to "today - 18 years fom now"
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.authService.registerUser({
        email: f.value.email,
        password: f.value.password
      });
    }

  }

}
