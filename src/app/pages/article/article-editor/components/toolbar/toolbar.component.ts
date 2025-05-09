import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBold, faItalic, faStrikethrough, faCode, faImage } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../../../../../shared/file.service';
import { ToastComponent } from '../../../../../components/toast/toast.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  imports: [FontAwesomeModule, ToastComponent],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  private fileService = inject(FileService);

  actions = [{
    icon: faBold,
    syntax: '**'
  },
  {
    icon: faItalic,
    syntax: '*'
  },
  {
    icon: faStrikethrough,
    syntax: '~~'
  },
  {
    icon: faCode,
    syntax: '```'
  }
  ]

  imageIcon = faImage;

  @Input() editor!: HTMLTextAreaElement;
  @Output() onChange = new EventEmitter<string>();

  error: string | undefined;

  onClick(syntax: string) {
    const start = this.editor.selectionStart;
    const end = this.editor.selectionEnd;
    let selectedText = this.editor.value.substring(start, end);
    selectedText = `${syntax}${selectedText}${syntax}`;
    this.editor.setRangeText(selectedText, start, end);
    this.onChange.emit(this.editor.value);
  }

  onSelectImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files) return;
    this.error = undefined;
    this.fileService.upload(fileInput.files[0]).subscribe({
      next:
        (data) => {
          const imgText = `\n![image alt text](/api/assets/${data.fileName})`;
          this.editor.setRangeText(imgText);
          this.onChange.emit(this.editor.value);
        },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 400) {
          this.error = httpError.error.validationErrors.file
        }
        else {
          this.error = 'Unexpected error occured, please try again.'
        }
      }
    })
  }
}
