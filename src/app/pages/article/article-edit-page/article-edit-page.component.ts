import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/article.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { Article } from '../../../shared/types';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';

@Component({
  selector: 'app-article-edit-page',
  imports: [SpinnerComponent, AlertComponent, ArticleEditorComponent],
  templateUrl: './article-edit-page.component.html'
})
export class ArticleEditPageComponent implements OnInit {
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);

  status: 'loading' | 'success' | 'fail' = 'loading';
  message: string = '';

  article!: Article;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.status = 'loading';
      this.articleService.fetchArticle(params['idOrSlug']).subscribe({
        next: data => {
          this.status = 'success';
          this.article = data;
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
