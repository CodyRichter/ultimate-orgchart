import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput;

  file: File = null;
  fileMsg: string = 'No File Selected'

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {}

  onClick(): void {
    this.file = null;
    this.fileMsg = 'No File Selected'
    this.fileInput.nativeElement.click();
  }

  onFileSelected(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    if (files == null || files[0].type == 'application/json') {
      this.file = files[0];
    } else {
      this.fileMsg = 'Invalid File Type!'
    }
  }

  async uploadFile() {
    if (this.file != null) {
      const headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      const formData = new FormData();
      formData.append('file', this.file);
      console.log(await this.httpClient.post('localhost:3000/employee/uploadJSON', formData, {headers}).toPromise());
    }
  }

}
