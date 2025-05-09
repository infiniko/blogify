import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-with-fallback',
  imports: [],
  templateUrl: './image-with-fallback.component.html'
})
export class ImageWithFallbackComponent {

  @Input() image: string | null = null;
  @Input() height: string = '150';
  @Input() classNames: string = '';

  @Input() fallbackType: 'profile' | 'article' = 'article';

  get imgSrc() {
    if (this.image) {
      return `/api/assets/${this.image}`
    }
    if (this.fallbackType === 'article') {
      return ``;
    }
    return '/assets/avatar.png';
  }

  get classList() {
    let classes = ['object-fit-cover', 'w-100'];
    classes.push(this.classNames);
    return classes.join(' ');
  }
}
