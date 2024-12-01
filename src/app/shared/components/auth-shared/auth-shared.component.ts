import { InputPasswordComponent } from "../input-password/input-password.component";
import { InputEmailComponent } from "../input-email/input-email.component";
import { InputTextComponent } from "../input-text/input-text.component";
import { LoaderService } from '../../services/loader.service';
import { Component, inject, input } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from "../../services/common.service";
import { StorageService } from "../../services/storage.service";

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
  private storageSrv: StorageService = inject(StorageService);
  private commonSrv: CommonService = inject(CommonService);

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
      if (!this.isValidEmail(this.email)) throw 'BadEmail';
      await this.AuthSrv.register(email, password, confirmPassword, displayName);
      this.resetForm();
      this.toastr.success('Inscription réussie !', 'Succès');
      this.router.navigate(['welcome/sign-in']);
    } catch (error) {
      (error === 'BadEmail') && this.toastr.error('Adresse email invalide', 'Erreur');
      (error === 'PasswordDontMatch') && this.toastr.error('Les mots de passe ne correspondent pas', 'Erreur');
      (error === 'IncorrectPassword') && this.toastr.error('Mot de passe/email incorrect', 'Erreur');
      (error instanceof Error) && this.commonSrv.handleError(error);
    } finally { this.loaderSrv.hide(); }
  }

  async login(email: string, password: string) {
    try {
      this.loaderSrv.show();
      const token = await this.AuthSrv.login(email, password);
      this.storageSrv.storeToken(token);
      this.resetForm();
      this.toastr.success('Connexion réussie !', 'Succès');
      this.router.navigate(['activity']);
    } catch (error) {
      (error === 'UserNotFound') && this.toastr.error('Compte introuvable', 'Erreur');
      (error === 'IncorrectPassword') && this.toastr.error('Mot de passe/email incorrect', 'Erreur');
      (error instanceof Error) && this.commonSrv.handleError(error);
    } finally { this.loaderSrv.hide(); }
  }

  //*** reset form  */
  resetForm = () => [this.email, this.password, this.displayName, this.confirmPassword] = ['', '', '', ''];
  // Fonction de validation d'email
    isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
