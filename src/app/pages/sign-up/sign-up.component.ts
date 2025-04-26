import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private apiService = inject(ApiService);
  email = new FormControl<string>('', { nonNullable: true });

  isDisabled() {
    return !this.email.value;
  }

  submitForSignUp(event: Event) {
    event.preventDefault();
    this.apiService.signUp(this.email.value).subscribe();
  }
}
