import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Node } from '../shared/models/node.model';

@Component({
  selector: 'chart-manager',
  templateUrl: './chart-manager.component.html',
  styleUrls: ['./chart-manager.component.css'],
})

export class ChartManagerComponent implements OnInit {

  @Input() datasource: Node;

  constructor() {
  }

  ngOnInit(): void {
  }
}
