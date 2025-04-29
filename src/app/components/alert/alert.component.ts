import { Component, Input } from '@angular/core';
import { Variant } from '../types';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() variantStyle: Variant = 'success';

  get alertClass() {
    const classes = ['alert']
    classes.push(`alert-${this.variantStyle}`);
    return classes.join(' ');
  }
}
