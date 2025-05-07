import { Component, inject } from '@angular/core';
import { FeedComponent } from "../../../components/feed/feed.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view-page',
  imports: [FeedComponent],
  templateUrl: './user-view-page.component.html'
})
export class UserViewPageComponent {
  readonly route = inject(ActivatedRoute);
}
