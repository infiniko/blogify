import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { ImageWithFallbackComponent } from '../../image-with-fallback/image-with-fallback.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-user-layout',
  imports: [ImageWithFallbackComponent, RouterLink],
  templateUrl: './user-layout.component.html'
})
export class UserLayoutComponent {
  private authService = inject(AuthService);
  @ViewChild('profileDropDown') profileDropDown!: ElementRef

  show: boolean = false;

  toggle() {
    this.show = !this.show;
  }

  logout() {
    this.authService.logout().subscribe();
  }

  get image() {
    return this.authService.user.getValue().image;
  }

  get name() {
    return this.authService.user.getValue().name;
  }

  get link() {
    return `/${this.authService.user.getValue().handle}`;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.show && !this.profileDropDown.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }
}
