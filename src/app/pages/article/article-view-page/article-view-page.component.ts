import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article, AVAILABLE_REACTIONS } from '../../../shared/types';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { SideArticlesComponent } from './components/side-articles/side-articles.component';
import { ArticleInfoComponent } from '../../../components/article-info/article-info.component';
import { PublishButtonComponent } from '../components/publish-button/publish-button.component';
import { AuthService } from '../../../shared/auth.service';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.min.css'
import { ImageWithFallbackComponent } from "../../../components/image-with-fallback/image-with-fallback.component";
import { ReactionButtonComponent } from '../../../components/reaction-button/reaction-button.component';

const marked = new Marked();
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value
    },
  })
)
marked.use({
  renderer: {
    paragraph(token) {
      const text = marked.parseInline(token.text);
      return `<p class="markdown">${text}</p>`;
    }
  }
})

@Component({
  selector: 'app-article-view-page',
  imports: [
    SpinnerComponent,
    AlertComponent,
    SideArticlesComponent,
    ArticleInfoComponent,
    PublishButtonComponent,
    RouterLink,
    ImageWithFallbackComponent,
    ReactionButtonComponent
  ],
  templateUrl: './article-view-page.component.html'
})
export class ArticleViewPageComponent implements OnInit {
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  status: 'loading' | 'success' | 'fail' = 'loading';
  message: string = '';
  reactions = AVAILABLE_REACTIONS;

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
      }
      );
    })
  }

  onTogglePublish(value: string | null) {
    this.article.publishedAt = value;
  }

  get isOwnedByLoggedInUser() {
    return this.article.author.id === this.authService.user.getValue().id;
  }

  get articleContent() {
    return marked.parse(this.article.content);
  }
}
