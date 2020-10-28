import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Node} from '../shared/models/node.model';
import {Subscription} from 'rxjs';
import {NodeSelectService} from '../shared/services/node-select.service';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragEnd, CdkDragStart} from '@angular/cdk/drag-drop';

@Component({
  selector: 'orgchart',
  templateUrl: './chart-root.component.html',
  styleUrls: ['./chart-root.component.css']
})
export class ChartRootComponent implements OnInit {

  @Input() datasource: Node;

  constructor() {
  }

  ngOnInit(): void {
  }

}
