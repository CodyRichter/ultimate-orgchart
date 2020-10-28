import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'chart-node',
  templateUrl: './chart-node.component.html',
  styleUrls: ['./chart-node.component.css']
})
export class ChartNodeComponent implements OnInit {

  @Input() nodeData: Node;

  @Output() nodeClick = new EventEmitter<any>();

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
          'Software Architect': '#00BCD4',
          'Senior Software Engineer': '#E57373'
        };
    return 'background: linear-gradient(0deg, white 80%,' + color[pos] +  ' 20%);';
  }

}
