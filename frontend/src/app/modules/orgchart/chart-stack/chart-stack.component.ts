import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chart-stack',
  templateUrl: './chart-stack.component.html',
  styleUrls: ['./chart-stack.component.css']
})
export class ChartStackComponent implements OnInit {

    @Input() datasource;

  nodeData = {
    name: 'Test Test',
    title: 'Software Engineer II'
  };
  nodeData1 = {
    name: 'Test Test',
    title: 'Engineering Manager'
  };
  nodeData2 = {
    name: 'Test Test',
    title: 'Software Engineer I'
  };

  constructor() { }

  ngOnInit(): void {
  }

  getColor(pos): string {
    const color =
        {
          'Engineering Manager': '#FFBA00',
          CEO: '#3C9329',
          'Software Engineer II': '#0093FF',
          'Tech Lead': '#019592',
          'Software Engineer I': '#7F39FB',
          'Research Manager': '#E57373',
          'Software Architect': '#00BCD4'
        };
    return 'background: linear-gradient(0deg, white 80%,' + color[pos] +  ' 20%);';
  }

  onStackClick(): void {
  }

}
