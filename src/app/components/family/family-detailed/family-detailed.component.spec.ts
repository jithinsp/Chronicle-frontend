import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailedComponent } from './family-detailed.component';

describe('FamilyDetailedComponent', () => {
  let component: FamilyDetailedComponent;
  let fixture: ComponentFixture<FamilyDetailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyDetailedComponent]
    });
    fixture = TestBed.createComponent(FamilyDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
