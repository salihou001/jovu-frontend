import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private toastr: ToastrService = inject(ToastrService);
  handleError(error: any, message?: string, title?: string) {
      if(error?.error?.message === 'EMAIL_EXISTS') { this.toastr.error(`Un compte avec cette adresse email existe deja`, 'Erreur'); }
      if(error?.error?.message === 'INVALID_LOGIN_CREDENTIALS') { this.toastr.error(`Adresse email ou mot de passe incorrect`, 'Erreur'); }
      this.toastr.error(message || 'Une erreur est survenue lors de cette opération', title || 'Erreur');
  }
}
