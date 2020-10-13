import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  ds = {
    id: '1',
    name: 'Adrienne Hawkins',
    title: 'CEO',
    children: [
      { id: '2',
        name: 'Bernadine Richard',
        title: 'Engineering Manager',
        children: [
          { id: '6', name: 'Williams Morales', title: 'Software Engineer II' },
          { id: '7', name: 'Dewey Mckay', title: 'Software Engineer II' }
        ]},
      {
        id: '21',
        name: 'Denis Matthews',
        title: 'Software Engineer II',
        children: [
          { id: '14', name: 'Jessie Willis', title: 'Tech Lead' },
          { id: '15', name: 'Josue Stuart', title: 'Software Engineer I' }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  selectNode(nodeData: { name: string, title: string }): void {
    alert(`Hi All. I'm ${nodeData.name}. I'm a ${nodeData.title}.`);
  }

}
