import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
  @Input() size: 'small' | 'regular' = 'small';

  get spinnerClass() {
    const classes = ['spinner-border']
    if (this.size === 'small') {
      classes.push('spinner-border-sm');
    }
    return classes.join(' ');
  }
}
