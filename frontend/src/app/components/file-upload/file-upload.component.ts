import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput;

  file: File = null;
  fileMsg = 'No File Selected';

  constructor(private readonly employeeService: EmployeeService, private dialogRef: MatDialog) { }

  ngOnInit() {}

  onClick(): void {
    this.file = null;
    this.fileMsg = 'No File Selected';
    this.fileInput.nativeElement.click();
  }

  onFileSelected(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    if (files == null || files[0].type === 'application/json') {
      this.file = files[0];
    } else {
      this.fileMsg = 'Invalid File Type!';
    }
  }

  async uploadFile(): Promise<void> {
    if (this.file != null) {
      // console.log(await this.employeeService.uploadJSON(this.file));
      this.dialogRef.closeAll();
    }

  }

}
