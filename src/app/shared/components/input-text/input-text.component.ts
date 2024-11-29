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
  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();

  @Input() id: string = ''; 
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputClass: string = 'form-control';
  @Output() enterPressed = new EventEmitter<void>();

  textPattern: RegExp = /^[a-zA-Z0-9]*$/;

  onInputChange(event: any): void {
    const currentValue = this.text;
    // Appliquer la regex pour garder seulement les caractères alphanumériques
    const sanitizedValue = currentValue.replace(/[^a-zA-Z0-9]/g, '');
    
    // Mettre à jour la valeur du mot de passe avec les caractères valides uniquement
    this.text = sanitizedValue;

    // Émettre l'événement de changement de mot de passe
    this.textChange.emit(this.text);
  }

}
