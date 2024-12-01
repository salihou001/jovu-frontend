import { AuthService } from './../../services/auth.service';
import { InputPasswordComponent } from "../input-password/input-password.component";
import { InputEmailComponent } from "../input-email/input-email.component";
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextComponent } from "../input-text/input-text.component";

@Component({
  selector: 'app-auth-shared',
  standalone: true,
  imports: [InputEmailComponent, InputPasswordComponent, InputTextComponent],
  templateUrl: './auth-shared.component.html',
  styleUrl: './auth-shared.component.scss'
})
export class AuthSharedComponent {

  private router: Router = inject(Router);
  private AuthSrv: AuthService = inject(AuthService);

  isSignUp = input.required<boolean>();

  email!: string;
  password!: string;
  displayName!: string;
  confirmPassword!: string;
  isLoading: boolean = false;

  goToLogin = (isSignUp: boolean) => isSignUp ? this.router.navigate(['welcome/sign-in']) : this.router.navigate(['welcome/sign-up']);

  async register(email: string, password: string, confirmPassword: string, displayName: string) {
    try {
      this.isLoading = true;
      await this.AuthSrv.register(email, password, confirmPassword, displayName);
      this.resetForm();
      this.router.navigate(['welcome/sign-in']);
    } catch (error) {
      console.log(error);
    }finally { this.isLoading = false; }
  }

  async login(email: string, password: string) {
    try {
      this.isLoading = true; 
      await this.AuthSrv.login(email, password);
      this.resetForm();
    } catch (error) { 
      console.log(error); 
    }finally { this.isLoading = false; }
  }

  //*** reset form  */
  resetForm = () => [this.email, this.password, this.displayName, this.confirmPassword] = ['', '', '', ''];
}
