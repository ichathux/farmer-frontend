import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-file-uploader',
  templateUrl: './sample-file-uploader.component.html',
  styleUrls: ['./sample-file-uploader.component.css'],
})
export class SampleFileUploaderComponent {
  constructor(private http: HttpClient) {}
  private selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
      formData.append('project_id', '10001');
      this.http
        .post('http://localhost:8080/api/file/v1/uploadSampleSheet', formData)
        .subscribe(
          (response) => {
            console.log('File uploaded successfully', response);
          },
          (error) => {
            console.error('Error uploading file', error);
          }
        );
    }
  }
}
