import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoansComponent } from './my-loans.component';

describe('MyLoansComponent', () => {
  let component: MyLoansComponent;
  let fixture: ComponentFixture<MyLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLoansComponent]
    });
    fixture = TestBed.createComponent(MyLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
