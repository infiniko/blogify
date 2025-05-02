import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-editor',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './article-editor.component.html'
})
export class ArticleEditorComponent {
  title = new FormControl<string>('', { nonNullable: true })
  content = new FormControl<string>('', { nonNullable: true })
}
