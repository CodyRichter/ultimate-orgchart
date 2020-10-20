import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListItemComponent } from './sidenav-list-item.component';

describe('SidenavListItemComponent', () => {
  let component: SidenavListItemComponent;
  let fixture: ComponentFixture<SidenavListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
