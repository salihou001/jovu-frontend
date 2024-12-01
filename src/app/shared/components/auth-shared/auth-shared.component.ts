import { AuthService } from './../../services/auth.service';
import { InputPasswordComponent } from "../input-password/input-password.component";
import { InputEmailComponent } from "../input-email/input-email.component";
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextComponent } from "../input-text/input-text.component";
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../services/loader.service';

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
  private toastr: ToastrService = inject(ToastrService);
  private loaderSrv: LoaderService = inject(LoaderService);

  isSignUp = input.required<boolean>();

  email!: string;
  password!: string;
  displayName!: string;
  confirmPassword!: string;
  isLoading: boolean = false;

  goToLogin = (isSignUp: boolean) => isSignUp ? this.router.navigate(['welcome/sign-in']) : this.router.navigate(['welcome/sign-up']);

  async register(email: string, password: string, confirmPassword: string, displayName: string) {
    try {
      this.loaderSrv.show();
      await this.AuthSrv.register(email, password, confirmPassword, displayName);
      this.resetForm();
      this.toastr.success('Inscription réussie !', 'Succès', {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      });
      this.router.navigate(['welcome/sign-in']);
    } catch (error) {
      this.toastr.error('Erreur lors de l\'inscription', 'Erreur');
      console.log(error);
    } finally { this.loaderSrv.hide(); }
  }

  async login(email: string, password: string) {
    try {
      this.loaderSrv.show();
      await this.AuthSrv.login(email, password);
      this.resetForm();
      this.toastr.success('Connexion réussie !', 'Succès', {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      });
      this.router.navigate(['activity']);
    } catch (error) {
      this.toastr.error('Erreur lors de la connexion', 'Erreur', {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      });
      console.log(error);
    } finally { this.loaderSrv.hide();}
  }

  //*** reset form  */
  resetForm = () => [this.email, this.password, this.displayName, this.confirmPassword] = ['', '', '', ''];
}
