import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file)
    return this.httpClient.post<{ fileName: string }>('/api/file/upload', formData)
  }
}
