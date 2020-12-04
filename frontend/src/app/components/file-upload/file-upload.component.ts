import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})


export class FileUploadComponent implements OnInit {
  loading: boolean = true;

  @ViewChild('fileInput')
  fileInput;

  uploadProject = false;

  file: File = null;
  fileMsg = 'No File Selected';

  constructor(private readonly employeeService: EmployeeService, private readonly projectService: ProjectService, 
    private snackBar: MatSnackBar, private dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) {
      if(data.uploadProjectInsteadOfEmployee){ 
        this.uploadProject = data.uploadProjectInsteadOfEmployee;
      }
     }

  ngOnInit() {
    this.loading = false;
  }

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
    if (this.file !== null) {
      this.loading = true;

      if (this.uploadProject) {
        await this.projectService.uploadJSON(this.file);
      } else {
        await this.employeeService.uploadJSON(this.file);
      }
      this.dialogRef.closeAll();
      this.snackBar.open("JSON uploaded!", "OK", {
        duration: 2000,
      });
      this.loading = false;

    }

  }


}
