import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStackComponent } from './chart-stack.component';

describe('ChartStackComponent', () => {
  let component: ChartStackComponent;
  let fixture: ComponentFixture<ChartStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
