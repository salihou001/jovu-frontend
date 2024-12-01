import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environnement/environnement';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core'; 
import { provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(), // Nécessaire pour ngx-toastr
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 5000, // Durée d'affichage du toast (en ms) //TODO(ajouter dans la varialbe d'environnement)
        positionClass: 'toast-bottom-right',
        preventDuplicates: true, // Évite les doublons de toast
      })
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
