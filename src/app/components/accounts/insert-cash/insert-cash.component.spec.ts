import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCashComponent } from './insert-cash.component';

describe('InsertCashComponent', () => {
  let component: InsertCashComponent;
  let fixture: ComponentFixture<InsertCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertCashComponent]
    });
    fixture = TestBed.createComponent(InsertCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
