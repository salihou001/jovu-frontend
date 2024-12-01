import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly TOKEN_KEY = 'authToken';

  // Méthode pour stocker le token
  storeToken(token: object): void {
    const tokenString = JSON.stringify(token);
    localStorage.setItem(this.TOKEN_KEY, tokenString);
  }

  // Méthode pour récupérer le token
  getToken(): object | null {
    const tokenString = localStorage.getItem(this.TOKEN_KEY);
    return tokenString ? JSON.parse(tokenString) : null;
  }

  // Méthode pour supprimer le token
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Vérifier si le token existe
  hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
