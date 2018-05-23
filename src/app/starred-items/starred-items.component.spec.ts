import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredItemsComponent } from './starred-items.component';

describe('StarredItemsComponent', () => {
  let component: StarredItemsComponent;
  let fixture: ComponentFixture<StarredItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarredItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarredItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
