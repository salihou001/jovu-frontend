import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  private loaderService: LoaderService = inject(LoaderService);
  isLoading = this.loaderService.loading$;
}
