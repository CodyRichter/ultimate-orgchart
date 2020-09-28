import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput;

  file: File = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {}

  onClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }

  uploadFile() {
    if (this.file != null) {
      // TODO
    }
  }

}
