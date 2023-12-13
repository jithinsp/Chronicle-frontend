import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegisterComponent } from './family-register.component';

describe('FamilyRegisterComponent', () => {
  let component: FamilyRegisterComponent;
  let fixture: ComponentFixture<FamilyRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyRegisterComponent]
    });
    fixture = TestBed.createComponent(FamilyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
