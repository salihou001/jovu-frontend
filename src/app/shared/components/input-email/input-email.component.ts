import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.scss'
})
export class InputEmailComponent {
  @Input() email: string = '';
  @Output() emailChange = new EventEmitter<string>();

  @Input() id: string = ''; 
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputClass: string = 'form-control';

  // Regex pour valider l'email
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
  // Méthode appelée lors de la saisie
  onInputChange(): void { this.emailChange.emit(this.email); }

}
