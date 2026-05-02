import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBibComponent } from './create-bib.component';

describe('CreateBibComponent', () => {
  let component: CreateBibComponent;
  let fixture: ComponentFixture<CreateBibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBibComponent]
    });
    fixture = TestBed.createComponent(CreateBibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
