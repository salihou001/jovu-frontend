import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environnement/environnement';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()) 
  ]
};
