import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArticleService } from '../../shared/article.service';
import { Article, Page } from '../../shared/types';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-feed',
  imports: [ArticleCardComponent, ButtonComponent],
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit, OnChanges {
  private articleService = inject(ArticleService);

  @Input() handle: string | null = null;

  data: Page<Article> = {
    content: [],
    page: 0,
    size: 5,
    total: 0
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['handle'].currentValue !== changes['handle'].previousValue && !changes['handle'].firstChange) {
      this.data = {
        content: [],
        page: 0,
        size: 5,
        total: 0
      }
      this.fetchData();
    }
  }

  fetchData(page: number = 0) {
    const apiFn = this.handle ?
      this.articleService.fetchArticlesOfUser(this.handle, page, this.data.size) :
      this.articleService.fetchArticles(page, this.data.size);
    apiFn.subscribe(data => {
      this.data = {
        content: [...this.data.content, ...data.content],
        page: data.page,
        size: data.size,
        total: data.total
      }
    })
  }

}
