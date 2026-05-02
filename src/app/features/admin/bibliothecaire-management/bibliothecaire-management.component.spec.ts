import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothecaireManagementComponent } from './bibliothecaire-management.component';

describe('BibliothecaireManagementComponent', () => {
  let component: BibliothecaireManagementComponent;
  let fixture: ComponentFixture<BibliothecaireManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BibliothecaireManagementComponent]
    });
    fixture = TestBed.createComponent(BibliothecaireManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
