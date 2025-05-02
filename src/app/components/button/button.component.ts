import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Variant } from '../types';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  imports: [SpinnerComponent],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() variantStyle: Variant = 'primary';
  @Input() disabled: boolean = false;
  @Input() apiProgress: boolean = false;
  @Output() onClick = new EventEmitter<void>()

  get buttonClass() {
    const classes = ['btn']
    classes.push(`btn-${this.variantStyle}`);
    return classes.join(' ');
  }
}
