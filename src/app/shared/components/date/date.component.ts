import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {
  @Input() label: string = '';
  @Input() date: Date |undefined = new Date();
  @Input() id: string = 'input-date';

  @Output() dateChange = new EventEmitter<string>();
}
