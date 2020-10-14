import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.css']
})
export class TransferRequestComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Adrienne Hawkins', 'Bernadine Richard', 'Williams Morales', 'Dewey Mckay', 'Denis Matthews', 'Jessie Willis', 'Josue Stuart'];
  filteredOptions: Observable<string[]>;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  openSnackBar(): void {
    this._snackBar.open('Request sent to Denis Matthews.', 'Done', {
      horizontalPosition: 'end'
    });
  }

}
