import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environnement/environnement';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // importProvidersFrom(
    //   // Chaque EnvironmentProvider séparé dans importProvidersFrom()
    //   provideFirebaseApp(() => initializeApp(environment.firebase)),
    //   importProvidersFrom(provideFirestore(() => getFirestore()))
    // )
  ]
};
