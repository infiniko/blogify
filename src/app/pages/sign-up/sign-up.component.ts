import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../components/alert/alert.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, ButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private apiService = inject(ApiService);
  email = new FormControl<string>('', { nonNullable: true, validators: [Validators.email] });

  apiProgress: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  errors: { email: string } | undefined;

  constructor() {
    this.email.valueChanges.subscribe(() => {
      this.errors = undefined;
    })
  }

  get EmailError() {
    if (this.email.errors && (this.email.touched || this.email.dirty)) {
      return "Invalid email format";
    }
    return this.errors?.email;
  }

  isDisabled() {
    return !this.email.value || this.apiProgress || !this.email.valid;
  }

  submitForSignUp(event: Event) {
    this.successMessage = '';
    this.errorMessage = '';
    this.apiProgress = true;
    event.preventDefault();
    this.apiService.signUp(this.email.value).subscribe({
      next: (response) => {
        this.apiProgress = false;
        this.successMessage = response.message
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 400) {
          this.errors = httpError.error.validationErrors
        } else {
          this.errorMessage = 'Unexpected error occured, please try again!'
        }
        this.apiProgress = false;
      }
    });
  }
}
