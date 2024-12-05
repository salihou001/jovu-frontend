import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() options: any[]  = [];
  @Input() selected: string | undefined = '';
  @Input() id: string = 'select';

  @Output() selectedChange = new EventEmitter<string>();
}
