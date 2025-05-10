import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, UserLayoutComponent, FontAwesomeModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  loggedIn = false;
  faBlog = faBlog;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((data) => {
      this.loggedIn = data.id > 0;
    })
  }

}
