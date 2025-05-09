import { Component, inject } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../../components/button/button.component';
import { ImageSelectorComponent } from '../../../components/image-selector/image-selector.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-page',
  imports: [ReactiveFormsModule, ButtonComponent, ImageSelectorComponent],
  templateUrl: './edit-profile-page.component.html'
})
export class EditProfilePageComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  name = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });
  image: string | null = null;

  apiProgress: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  errors: { name: string } | undefined;

  constructor() {
    this.name.valueChanges.subscribe(() => {
      this.errors = undefined;
    })
    this.name.setValue(this.authService.user.getValue().name);
    this.image = this.authService.user.getValue().image;
  }

  get nameError() {
    if (this.name.errors && (this.name.touched || this.name.dirty)) {
      return "Required";
    }
    return this.errors?.name;
  }

  onChangeImage(value: string | null) {
    this.image = value;
  }

  submit(event: Event) {
    this.successMessage = '';
    this.errorMessage = '';
    this.apiProgress = true;
    event.preventDefault();
    this.userService.updateUser(this.authService.user.getValue().id, {
      name: this.name.value,
      image: this.image
    }).subscribe({
      next: (response) => {
        this.apiProgress = false;
        this.authService.updateUser(this.name.value, this.image);
        this.router.navigate([`/${this.authService.user.getValue().handle}`])
        // this.successMessage = response.message
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 400) {
          this.errors = httpError.error.validationErrors;
        } else {
          this.errorMessage = 'Unexpected error occured, please try again!'
        }
        this.apiProgress = false;
      }
    });
  }
}
