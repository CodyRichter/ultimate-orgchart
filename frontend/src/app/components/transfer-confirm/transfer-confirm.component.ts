import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer-confirm',
  templateUrl: './transfer-confirm.component.html',
  styleUrls: ['./transfer-confirm.component.css']
})
export class TransferConfirmComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(): void {
    this._snackBar.open('Request sent to Denis Matthews.', 'Done', {
      horizontalPosition: 'end'
    });
  }

}
