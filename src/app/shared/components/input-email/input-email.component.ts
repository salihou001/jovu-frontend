import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss']
})
export class InputEmailComponent {
  @Input() email: string = '';
  @Output() emailChange = new EventEmitter<string>();

  @Input() id: string = 'email-input';
  @Input() label: string = '';
  @Input() placeholder: string = 'Enter your email';

  // Vérification de l'email valide ou non
  get isEmailValid(): boolean {
    const emailRegex = new RegExp(this.emailPattern);
    return emailRegex.test(this.email);
  }

  // Regex pour valider les emails
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  // Émet la valeur uniquement quand elle change
  onInputChange(newValue: string): void {
    this.email = newValue;
    this.emailChange.emit(newValue);
  }
}
