import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSignUpComponent } from './sign-in-sign-up.component';

describe('SignInSignUpComponent', () => {
  let component: SignInSignUpComponent;
  let fixture: ComponentFixture<SignInSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
