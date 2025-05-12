import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faSun, faBookmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Reaction } from '../../../../shared/types';

@Component({
  selector: 'app-filter',
  imports: [FontAwesomeModule],
  templateUrl: './filter.component.html'
})
export class FilterComponent {
  icons = {
    faHeart: faHeart,
    faSun: faSun,
    faBookmark: faBookmark
  }

  @Output() setFilter = new EventEmitter<null | Reaction>();

  onClick(param: null | Reaction) {
    this.setFilter.emit(param);
  }
}
