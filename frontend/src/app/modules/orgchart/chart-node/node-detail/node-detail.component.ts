import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/index';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'chart-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent implements OnInit {

  nodeData: Employee;
  

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog) {
    this.nodeData = data.nodeData;
  }

  ngOnInit(): void {
  }

  openEditNodeDialog(): void {
    this.dialog.open(EditNodeDialog, {
      data: { nodeData: this.nodeData }
  })
  }

  getColor(pos: string): string {
    const color =
        {
          'Engineering Manager': '#FFBA00',
          CEO: '#3C9329',
          'Software Engineer II': '#0093FF',
          'Tech Lead': '#019592',
          'Software Engineer I': '#7F39FB',
          'Research Manager': '#E57373',
          'Software Architect': '#00BCD4',
          'Senior Software Engineer': '#E57373'
        };
    return 'background-color:' + color[pos] + ';';
  }

}

@Component({
  selector: 'edit-node-dialog',
  templateUrl: 'edit-node-dialog.html',
})
export class EditNodeDialog {}
