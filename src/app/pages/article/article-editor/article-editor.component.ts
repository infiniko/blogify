import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../shared/article.service';
import { PublishButtonComponent } from '../components/publish-button/publish-button.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Article } from '../../../shared/types';
import { AuthService } from '../../../shared/auth.service';
import { RouterLink } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ImageSelectorComponent } from '../../../components/image-selector/image-selector.component';

@Component({
  selector: 'app-article-editor',
  imports: [ButtonComponent, ReactiveFormsModule, PublishButtonComponent, RouterLink, ToolbarComponent, ImageSelectorComponent],
  templateUrl: './article-editor.component.html'
})
export class ArticleEditorComponent {

  private articleService = inject(ArticleService);
  private authService = inject(AuthService);

  title = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  content = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })

  id: number = 0;
  apiProgress = false;
  image: string | null = null;
  published = false;

  @Input() set article(article: Article) {
    this.title.setValue(article.title);
    this.content.setValue(article.content);
    this.image = article.image;
    this.id = article.id;
    this.published = !!article.publishedAt

  }


  errors: { title: string | undefined, content: string | undefined } | undefined;
  constructor() {
    this.title.valueChanges.subscribe(() => {
      if (this.errors?.title) {
        this.errors.title = undefined;
      }
    });
    this.content.valueChanges.subscribe(() => {
      if (this.errors?.content) {
        this.errors.content = undefined;
      }
    });
  }

  checkValidity() {
    let validity = true;
    const validationErrors: typeof this.errors = {
      title: undefined,
      content: undefined
    }

    if (this.title.errors) {
      validationErrors.title = 'Title required';
      validity = false;
    }

    if (this.content.errors) {
      validationErrors.content = 'Content required';
      validity = false;
    }

    this.errors = validationErrors;
    return validity;
  }

  submit() {
    if (!this.checkValidity()) return;
    this.apiProgress = true;
    this.articleService.createOrUpdateArticle({
      title: this.title.value,
      content: this.content.value,
      image: this.image
    }, this.id).subscribe({
      next: (data) => {
        this.apiProgress = false;
        this.id = data.id;
      },
      error: (httpError: HttpErrorResponse) => {
        this.apiProgress = false;
        if (httpError.status === 400) {
          this.errors = httpError.error.validationErrors
        }
      }
    })
  }

  get previewUrl() {
    return `/${this.authService.user.getValue().handle}/${this.id}`
  }

  //function used to update values changed by toolbar interaction
  onChangeContent(value: string) {
    this.content.setValue(value);
  }

  onChageImage(value: string | null) {
    this.image = value;
  }
}
