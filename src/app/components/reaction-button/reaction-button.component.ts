import { Component, inject, Input } from '@angular/core';
import { ReactionService } from './reaction.service';
import { Reaction, ReactionDetails } from '../../shared/types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faSun, faBookmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faSun as farSun, faBookmark as faRBookmark } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-reaction-button',
  imports: [FontAwesomeModule],
  templateUrl: './reaction-button.component.html'
})
export class ReactionButtonComponent {

  private authService = inject(AuthService);
  private reactionService = inject(ReactionService);

  @Input({ required: true }) category!: Reaction;
  @Input() entityId!: number;

  actions: Record<Reaction, { icon: IconDefinition, iconR: IconDefinition, color: string }> = {
    like: {
      icon: faHeart,
      iconR: farHeart,
      color: '#F368E0'
    },
    hot: {
      icon: faSun,
      iconR: farSun,
      color: '#FF9F43'
    },
    readlater: {
      icon: faBookmark,
      iconR: faRBookmark,
      color: '#6C5CE7'
    }
  }

  reacted: boolean = false;
  count: number = 0;

  @Input() set details(value: ReactionDetails) {
    this.reacted = value.reacted;
    this.count = value.count;
  }

  onClick() {
    if (this.authService.user.getValue().id === 0) {
      return;
    }
    this.reactionService.reactToArticle(this.entityId, this.category).subscribe((data) => {
      this.reacted = data.result;
      if (this.reacted) {
        this.count++;
      }
      else {
        this.count--;
      }
    })
  }
}