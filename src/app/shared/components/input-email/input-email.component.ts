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
  onInputChange(event: any): void {
    const currentValue = this.email;
    // Validation du format de l'email
    if (this.isValidEmail(currentValue)) {
      // Si l'email est valide, émettre l'événement de changement
      this.emailChange.emit(currentValue);
    }else {
      console.log("bad email");
    }
  }

  // Fonction de validation d'email
  isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
