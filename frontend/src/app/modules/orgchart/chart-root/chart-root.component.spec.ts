import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRootComponent } from './chart-root.component';

describe('ChartRootComponent', () => {
  let component: ChartRootComponent;
  let fixture: ComponentFixture<ChartRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
