import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() text: string | undefined = '';
  @Output() textChange = new EventEmitter<string>();

  @Input() id: string = ''; 
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputClass: string = 'form-control';
  @Output() enterPressed = new EventEmitter<void>();

  textPattern: RegExp = /^[a-zA-Z0-9 ]*$/;

  onInputChange(): void {
    const currentValue = this.text;
    // control alpha numeric value
    const sanitizedValue = currentValue?.replace(/[^a-zA-Z0-9 ]/g, '');
    this.text = sanitizedValue;
    // emit text value on input
    this.textChange.emit(this.text);
  }

}
