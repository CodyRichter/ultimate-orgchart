import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'org-chart';
}

export class emp {
  firstName: string;
  lastName: string;
  empID:number;
  companyId:number;
  positionTitle:string;
  companyName:string;
  isManager:boolean;
  isAdmin:boolean;
  email:string;
} 
 
