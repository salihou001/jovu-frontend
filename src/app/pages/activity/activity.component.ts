import { Component } from '@angular/core';
import { BoxTaskComponent } from '../../shared/components/box-task/box-task.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [BoxTaskComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

}
