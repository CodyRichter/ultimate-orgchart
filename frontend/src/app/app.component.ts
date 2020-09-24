import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'org-chart';

  constructor(private httpClient: HttpClient) {
    // this.getUsers();
    // this.postUsers();
  }

  async getUsers(): Promise<void> {
    const result = await this.httpClient.get('http://localhost:3000/user').toPromise();
    console.log(result);
  }

  async postUsers(){
    const userToAdd = { companyId: 3, companyName: "Nightwell Enterprise", email: "MaryLan@nightwellenterprise.com", employeeId: 4, firstName: "Mary", isManager: true, lastName: "Lan", managerId: 1, password: "pwd", positionTitle: "Engineering Manager", startDate: "2016-07-22T00:00:00.000Z"}
    const result = await this.httpClient.post('http://localhost:3000/user', userToAdd).toPromise();
    console.log(result);
  }

}

export class ListSingleSelectionExample {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
