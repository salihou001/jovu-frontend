import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  // Vérifier si le token existe dans le localStorage
  if (storageService.hasToken()) {
    return true;
  } else {
    router.navigate(['welcome/sign-in'], { queryParams: { returnUrl: state.url } }); 
    return false;
  }
};
