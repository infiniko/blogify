import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FileService } from '../../shared/file.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-selector',
  imports: [],
  templateUrl: './image-selector.component.html'
})
export class ImageSelectorComponent {

  private fileService = inject(FileService);
  error: string | undefined;
  @Input() image: string | null = null;

  @Output() onChangeImage = new EventEmitter<string | null>();

  onSelectImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files) return;
    this.error = undefined;
    this.fileService.upload(fileInput.files[0]).subscribe({
      next:
        (data) => {
          this.image = data.fileName;
          this.onChangeImage.emit(this.image);
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

  deleteImage() {
    this.image = null;
    this.onChangeImage.emit(this.image);
  }

}
