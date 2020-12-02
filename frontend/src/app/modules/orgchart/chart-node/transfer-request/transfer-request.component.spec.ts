import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRequestComponent } from './transfer-request.component';

describe('TransferRequestComponent', () => {
  let component: TransferRequestComponent;
  let fixture: ComponentFixture<TransferRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
