import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, InputTextComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should display the placeholder in the input', () => {
    component.placeholder = 'Enter text';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Enter text');
  });

  it('should emit textChange when input changes', () => {
    spyOn(component.textChange, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'New Text';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.textChange.emit).toHaveBeenCalledWith('New Text');
  });

  it('should sanitize input and allow only alphanumeric characters and spaces', () => {
    spyOn(component.textChange, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Test123@#';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.text).toBe('Test123');
    expect(component.textChange.emit).toHaveBeenCalledWith('Test123');
  });

  it('should apply the inputClass to the input element', () => {
    component.inputClass = 'custom-class';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.classList).toContain('custom-class');
  });

});
