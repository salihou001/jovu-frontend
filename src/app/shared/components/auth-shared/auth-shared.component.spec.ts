import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSharedComponent } from './auth-shared.component';

describe('AuthSharedComponent', () => {
  let component: AuthSharedComponent;
  let fixture: ComponentFixture<AuthSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
