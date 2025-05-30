import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../../../../../shared/article.service';
import { Article, Page } from '../../../../../shared/types';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-articles',
  imports: [RouterLink],
  templateUrl: './side-articles.component.html'
})
export class SideArticlesComponent implements OnInit {
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);

  data: Page<Article> = {
    content: [],
    page: 0,
    size: 3,
    total: 0
  }

  ngOnInit(): void {
    this.articleService.fetchArticlesOfUser(this.route.snapshot.paramMap.get('handle')!, 0, 3).subscribe(data => {
      this.data = data;
    })
  }
}