import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {

  private router: Router = inject(Router);
  private storageSrv: StorageService = inject(StorageService);
  ngOnInit(): void {
    if(this.storageSrv.hasToken()) this.router.navigate(['activity']);
  }
} 
