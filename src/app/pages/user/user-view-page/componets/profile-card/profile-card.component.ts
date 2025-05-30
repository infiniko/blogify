import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../../shared/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Author } from '../../../../../shared/types';
import { UntypedFormBuilder } from '@angular/forms';
import { ImageWithFallbackComponent } from '../../../../../components/image-with-fallback/image-with-fallback.component';
import { AuthService } from '../../../../../shared/auth.service';

@Component({
  selector: 'app-profile-card',
  imports: [ImageWithFallbackComponent, RouterLink],
  templateUrl: './profile-card.component.html'
})
export class ProfileCardComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  readonly route = inject(ActivatedRoute);

  user: Author | undefined;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userService.fetchUser(params['handle']).subscribe((data) => {
        this.user = data;
      })
    })
  }

  get isLoggedIn() {
    return this.authService.user.getValue().handle === this.route.snapshot.paramMap.get('handle')
  }
}
