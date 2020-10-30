import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'organization-chart',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent implements OnInit {

  @Input() datasource;
  @Input() pan = true;
  @Input() zoom = false;
  @Input() zoomoutLimit = 0.5;
  @Input() zoominLimit = 7;
  @Input() select = 'single';

  cursorVal = 'default';
  panning = false;
  startX = 0;
  startY = 0;
  transformVal = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  panEndHandler(): void {
    this.panning = false;
    this.cursorVal = 'default';
  }

  panHandler(e): void {
    let newX = 0;
    let newY = 0;
    if (!e.targetTouches) {
      // pand on desktop
      newX = e.pageX - this.startX;
      newY = e.pageY - this.startY;
    } else if (e.targetTouches.length === 1) {
      // pan on mobile device
      newX = e.targetTouches[0].pageX - this.startX;
      newY = e.targetTouches[0].pageY - this.startY;
    } else if (e.targetTouches.length > 1) {
      return;
    }
    if (this.transformVal === '') {
      if (this.transformVal.indexOf('3d') === -1) {
        this.transformVal = 'matrix(1,0,0,1,' + newX + ',' + newY + ')';
      } else {
        this.transformVal =
            'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + newX + ', ' + newY + ',0,1)';
      }
    } else {
      const matrix = this.transformVal.split(',');
      if (this.transformVal.indexOf('3d') === -1) {
        matrix[4] = newX.toString();
        matrix[5] = newY + ')';
      } else {
        matrix[12] = newX.toString();
        matrix[13] = newY.toString();
      }
      this.transformVal = matrix.join(',');
    }
  }

  panStartHandler(e): void {
    if (e.target.querySelectorAll('.node') && e.target.querySelectorAll('.node').length) {
      this.panning = false;
      return;
    } else {
      this.cursorVal = 'move';
      this.panning = true;
    }
    let lastX = 0;
    let lastY = 0;
    if (this.transformVal !== '') {
      const matrix = this.transformVal.split(',');
      if (this.transformVal.indexOf('3d') === -1) {
        lastX = parseInt(matrix[4], 10);
        lastY = parseInt(matrix[5], 10);
      } else {
        lastX = parseInt(matrix[12], 10);
        lastY = parseInt(matrix[13], 10);
      }
    }
    if (!e.targetTouches) {
      // pand on desktop
      this.startX = e.pageX - lastX;
      this.startY = e.pageY - lastY;
    } else if (e.targetTouches.length === 1) {
      // pan on mobile device
      this.startX = e.targetTouches[0].pageX - lastX;
      this.startY = e.targetTouches[0].pageY - lastY;
    } else if (e.targetTouches.length > 1) {
      return;
    }
  }

}
