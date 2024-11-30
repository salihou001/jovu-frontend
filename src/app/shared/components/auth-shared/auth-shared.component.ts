import { InputPasswordComponent } from "../input-password/input-password.component";
import { InputEmailComponent } from "../input-email/input-email.component";
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-shared',
  standalone: true,
  imports: [InputEmailComponent, InputPasswordComponent],
  templateUrl: './auth-shared.component.html',
  styleUrl: './auth-shared.component.scss'
})
export class AuthSharedComponent {

  private router: Router = inject(Router);
  isSignUp = input.required<boolean>();

  goToLogin = (isSignUp: boolean) =>  isSignUp ? this.router.navigate(['welcome/sign-in']) : this.router.navigate(['welcome/sign-up']);
}
