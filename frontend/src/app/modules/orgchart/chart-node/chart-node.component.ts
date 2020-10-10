import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Node } from '../shared/models/node.model';
import { NodeSelectService } from '../shared/services/node-select.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragExit} from "@angular/cdk/drag-drop";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'orgchart-node',
  templateUrl: './chart-node.component.html',
  styleUrls: ['./chart-node.component.css'],
  animations: [
    trigger('expandCollapse', [
      state(
          'expanded',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
      ),
      state(
          'collapsed',
          style({
            transform: 'translateY(-50px)',
            opacity: 0
          })
      ),
      transition('expanded => collapsed', [animate('0.2s')]),
      transition('collapsed => expanded', [animate('0.2s')])
    ])
  ]
})
export class ChartNodeComponent implements OnInit {

  @Input() datasource: Node;
  @Input() nodeHeading;
  @Input() nodeContent;
  @Input() nodeTemplate: TemplateRef<any>;
  @Input() groupScale: number;
  @Input() select: string;

  @Output() nodeClick = new EventEmitter<any>();

  Arr = Array; // Array type captured in a variable
  isCollapsed = false;
  ecStyles: object;
  isSelected: boolean;
  subscription: Subscription;

  constructor(private nodeSelectService: NodeSelectService) {
    // subscribe to node selection status
    this.subscription = this.nodeSelectService.getSelect().subscribe(selection => {
      if (selection && selection.id) {
        this.isSelected = this.datasource.id === selection.id;
      } else { // clear selection when empty selection received
        this.isSelected = false;
      }
    });
  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

  ngOnInit(): void {
  }

  toggleChildren(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleAnimStart(event): void {
    if (this.isCollapsed) {
      if (
          event.element.parentElement &&
          event.element.parentElement.parentElement &&
          event.element.parentElement.parentElement.classList.contains('orgchart')
      ) {
        event.element.previousElementSibling.classList.add('oc-is-collapsed');
      }
    } else {
      this.ecStyles = {
        display: 'flex'
      };
    }
  }

  toggleAnimEnd(event): void {
    if (this.isCollapsed) {
      this.ecStyles = {
        display: 'none'
      };
    } else {
      if (
          event.element.parentElement &&
          event.element.parentElement.parentElement &&
          event.element.parentElement.parentElement.classList.contains('orgchart')
      ) {
        event.element.previousElementSibling.classList.remove('oc-is-collapsed');
      }
    }
  }

  onClickNode(e): void {
    this.nodeClick.emit(this.datasource);
    if (this.select === 'single') {
      this.nodeSelectService.sendSelect(this.datasource.id);
    } else if (this.select === 'multiple') {
      this.isSelected = !this.isSelected;
    }
  }

  onNodeClick(e): void {
    this.nodeClick.emit(e);
  }

  getColor(pos): string {
    const color =
    {
      'Engineering Manager': '#FFBA00',
      CEO: '#3C9329',
      'Software Engineer II': '#0093FF',
      'Tech Lead': '#019592',
      'Software Engineer I': '#7F39FB'
    };
    return 'background: linear-gradient(0deg, white 80%,' + color[pos] +  ' 20%);';
  }

  onDragEnded(event: CdkDragEnd): void {
    event.source._dragRef.reset();
  }
}
