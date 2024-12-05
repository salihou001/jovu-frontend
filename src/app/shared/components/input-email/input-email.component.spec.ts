import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputEmailComponent } from './input-email.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('InputEmailComponent', () => {
  let component: InputEmailComponent;
  let fixture: ComponentFixture<InputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, InputEmailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    component.label = 'Test Email Label';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelElement.textContent).toContain('Test Email Label');
  });

  it('should display the placeholder in the input', () => {
    component.placeholder = 'Enter your email';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Enter your email');
  });

  it('should emit emailChange when input changes', () => {
    spyOn(component.emailChange, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'test@example.com';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.emailChange.emit).toHaveBeenCalledWith('test@example.com');
  });

  it('should validate the email address correctly (valid email)', () => {
    component.email = 'valid@example.com';
    fixture.detectChanges();

    expect(component.isEmailValid).toBeTrue();
  });

  it('should validate the email address correctly (invalid email)', () => {
    component.email = 'invalid-email';
    fixture.detectChanges();

    expect(component.isEmailValid).toBeFalse();
  });

  it('should display the input as valid when email is correct', () => {
    component.email = 'valid@example.com';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.getAttribute('aria-invalid')).toBe('false');
  });

  it('should display the input as invalid when email is incorrect', () => {
    component.email = 'invalid-email';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.getAttribute('aria-invalid')).toBe('true');
  });

  it('should apply id attribute to input element', () => {
    component.id = 'custom-id';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.id).toBe('custom-id');
  });
});
