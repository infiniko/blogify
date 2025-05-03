import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ArticleService } from '../../../../shared/article.service';

@Component({
  selector: 'app-publish-button',
  imports: [ButtonComponent],
  templateUrl: './publish-button.component.html'
})
export class PublishButtonComponent {
  private articleService = inject(ArticleService);
  @Input() id: number = 0;

  published: boolean = false;

  apiProgress: boolean = false;
  onClick() {
    this.apiProgress = true;
    this.articleService.togglePublish(this.id).subscribe((data) => {
      this.apiProgress = false;
      this.published = data.published;
    })
  }


}
