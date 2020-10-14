import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferConfirmComponent } from './transfer-confirm.component';

describe('TransferConfirmComponent', () => {
  let component: TransferConfirmComponent;
  let fixture: ComponentFixture<TransferConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
