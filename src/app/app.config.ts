import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environnement/environnement';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // Ajout des animations nécessaires
import { importProvidersFrom } from '@angular/core'; // Pour importer des modules comme ToastrModule
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // Nécessaire pour ngx-toastr
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 5000, // Durée d'affichage du toast (en ms)
        positionClass: 'toast-bottom-right',
        preventDuplicates: true, // Évite les doublons
      })
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
