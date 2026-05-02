import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLivreComponent } from './create-livre.component';

describe('CreateLivreComponent', () => {
  let component: CreateLivreComponent;
  let fixture: ComponentFixture<CreateLivreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLivreComponent]
    });
    fixture = TestBed.createComponent(CreateLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
