import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.authChange
      .subscribe(authStatus => {
          this.isAuth = authStatus;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onToggle() {
    this.sideNavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

}
