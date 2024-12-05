import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() text: string | undefined = '';
  @Input() id: string = 'textarea';
  @Input() rows: number = 3;

  @Output() textChange = new EventEmitter<string>();
}
