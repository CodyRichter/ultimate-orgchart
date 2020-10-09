import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NodeSelectService {

  private subject = new Subject<any>();

  constructor() { }

  sendSelect(id: string): void {
    this.subject.next({ id });
  }

  clearSelect(): void {
    this.subject.next();
  }

  getSelect(): Observable<any> {
    return this.subject.asObservable();
  }

}
