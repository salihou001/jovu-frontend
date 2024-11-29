import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss'
})
export class InputPasswordComponent {
  @Input() password: string = '';
  @Output() passwordChange = new EventEmitter<string>();

  @Input() id: string = ''; 
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputClass: string = 'form-control';
  @Output() enterPressed = new EventEmitter<void>();
  
  showPassword: WritableSignal<boolean> = signal(false);

  togglePasswordVisibility = () => this.showPassword.set(!this.showPassword());
}
