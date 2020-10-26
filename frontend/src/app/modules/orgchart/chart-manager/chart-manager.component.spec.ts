import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartManagerComponent } from './chart-manager.component';

describe('ChartManagerComponent', () => {
  let component: ChartManagerComponent;
  let fixture: ComponentFixture<ChartManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
