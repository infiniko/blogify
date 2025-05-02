import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-callback-page',
  imports: [AlertComponent, SpinnerComponent],
  templateUrl: './callback-page.component.html'
})
export class CallbackPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);

  status: 'loading' | 'success' | 'fail' = 'loading';
  message = '';
  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams) => {
      this.status = 'loading';
      this.authService.auth(queryParams['token'], queryParams['operation']).subscribe({
        next: () => {
          if (queryParams['operation'] === 'register') {
            this.status = 'success';
            this.message = 'Account is created';
          }
          else {
            this.router.navigate(['/'])
          }
        },
        error: (httpError: HttpErrorResponse) => {
          this.status = 'fail';
          if (httpError.status) {
            this.message = httpError.error.message
          } else {
            this.message = 'Unexpected error occured';
          }
        }
      });
    })
  }

}
