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
    this.getUsers();
  }

  async getUsers() {
    const result = await this.httpClient.get('http://localhost:3000/user').toPromise();
    console.log(result);
  }

}

export class ListSingleSelectionExample {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
