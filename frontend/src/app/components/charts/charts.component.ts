import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router, private httpClient: HttpClient, public dialog: MatDialog) {
  }

  nodes: any = [
    {
      name: 'Sundar Pichai',
      cssClass: 'ngx-org-ceo',
      image: '',
      title: 'Chief Executive Officer',
      childs: [
        {
          name: 'Thomas Kurian',
          cssClass: 'ngx-org-head',
          image: 'assets/icons/profile-image.svg',
          title: 'CEO, Google Cloud',
        },
        {
          name: 'Susan Wojcicki',
          cssClass: 'ngx-org-head',
          image: 'assets/icons/profile-image.svg',
          title: 'CEO, YouTube',
          childs: [
            {
              name: 'Beau Avril',
              cssClass: 'ngx-org-vp',
              image: 'assets/icons/profile-image.svg',
              title: 'Global Head of Business Operations',
              childs: []
            },
            {
              name: 'Tara Walpert Levy',
              cssClass: 'ngx-org-vp',
              image: 'assets/icons/profile-image.svg',
              title: 'VP, Agency and Brand Solutions',
              childs: []
            },
            {
              name: 'Ariel Bardin',
              cssClass: 'ngx-org-vp',
              image: 'assets/icons/profile-image.svg',
              title: 'VP, Product Management',
              childs: []
            }
          ]
        },
        {
          name: 'Jeff Dean',
          cssClass: 'ngx-org-head',
          image: 'assets/icons/profile-image.svg',
          title: 'Head of Artificial Intelligence',
          childs: [
            {
              name: 'David Feinberg',
              cssClass: 'ngx-org-vp',
              image: 'assets/icons/profile-image.svg',
              title: 'CEO, Google Health',
              childs: []
            }
          ]
        }
      ]
    }
    // {
    //   name: 'Sundar Pichai',
    //   cssClass: 'ngx-org-ceo',
    //   image: 'assets/icons/profile-image.svg',
    //   title: 'Chief Executive Officer',
    //   childs: [
    //     {
    //       name: 'Thomas Kurian',
    //       cssClass: 'ngx-org-ceo',
    //       image: 'assets/icons/profile-image.svg',
    //       title: 'CEO, Google Cloud',
    //     },
    //     {
    //       name: 'Susan Wojcicki',
    //       cssClass: 'ngx-org-ceo',
    //       image: 'assets/icons/profile-image.svg',
    //       title: 'CEO, YouTube',
    //       childs: [
    //         {
    //           name: 'Beau Avril',
    //           cssClass: 'ngx-org-head',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'Global Head of Business Operations',
    //           childs: []
    //         },
    //         {
    //           name: 'Tara Walpert Levy',
    //           cssClass: 'ngx-org-vp',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'VP, Agency and Brand Solutions',
    //           childs: []
    //         },
    //         {
    //           name: 'Ariel Bardin',
    //           cssClass: 'ngx-org-vp',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'VP, Product Management',
    //           childs: []
    //         }
    //       ]
    //     },
    //     {
    //       name: 'Jeff Dean',
    //       cssClass: 'ngx-org-head',
    //       image: 'assets/icons/profile-image.svg',
    //       title: 'Head of Artificial Intelligence',
    //       childs: [
    //         {
    //           name: 'David Feinberg',
    //           cssClass: 'ngx-org-ceo',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'CEO, Google Health',
    //           childs: []
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   name: 'Sundar Pichai',
    //   cssClass: 'ngx-org-ceo',
    //   image: 'assets/icons/profile-image.svg',
    //   title: 'Chief Executive Officer',
    //   childs: [
    //     {
    //       name: 'Thomas Kurian',
    //       cssClass: 'ngx-org-ceo',
    //       image: 'assets/icons/profile-image.svg',
    //       title: 'CEO, Google Cloud',
    //     },
    //     {
    //       name: 'Susan Wojcicki',
    //       cssClass: 'ngx-org-ceo',
    //       image: 'assets/icons/profile-image.svg',
    //       title: 'CEO, YouTube',
    //       childs: [
    //         {
    //           name: 'Beau Avril',
    //           cssClass: 'ngx-org-head',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'Global Head of Business Operations',
    //           childs: []
    //         },
    //         {
    //           name: 'Tara Walpert Levy',
    //           cssClass: 'ngx-org-vp',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'VP, Agency and Brand Solutions',
    //           childs: []
    //         },
    //         {
    //           name: 'Ariel Bardin',
    //           cssClass: 'ngx-org-vp',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'VP, Product Management',
    //           childs: []
    //         }
    //       ]
    //     },
    //     {
    //       name: 'Jeff Dean',
    //       cssClass: 'ngx-org-head',
    //       image: 'assets/icons/profile-image.svg',
    //       title: 'Head of Artificial Intelligence',
    //       childs: [
    //         {
    //           name: 'David Feinberg',
    //           cssClass: 'ngx-org-ceo',
    //           image: 'assets/icons/profile-image.svg',
    //           title: 'CEO, Google Health',
    //           childs: []
    //         }
    //       ]
    //     }
     // ]
   // }
  ];

  logout(): void {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login').then();
  }

  async getUser(): Promise<void> {
    console.log(await this.httpClient.get('http://localhost:3000/auth/profile').toPromise());
  }

  async getEmployees(): Promise<void> {
    console.log(await this.httpClient.get('http://localhost:3000/employee/all').toPromise());
  }

  openJSONUploadDialog() {
    const dialogRef = this.dialog.open(JSONUploadDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'json-upload-dialog',
  templateUrl: 'json-upload-dialog.html',
})
export class JSONUploadDialog {}
