import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent implements OnInit {

  constructor(public dialog: MatDialog, private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  transferRequest(): void {
    const dialogRef = this.dialog.open(TransferRequestDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isManager(): boolean {
    try {
      return this.authService.profile.isManager;
    }
    catch (e) {
      return false;
    }
  }

}

@Component({
  selector: 'transfer-request-dialog',
  templateUrl: '../node-detail/transfer-request-dialog.html',
})
export class TransferRequestDialog {}
