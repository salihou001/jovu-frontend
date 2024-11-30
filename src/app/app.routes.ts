import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    {
        path: 'welcome',
        loadComponent: () => import('./pages/welcome/welcome.component').then(m => m.WelcomeComponent),
        children: [
            {
                path: '', 
                redirectTo: 'sign-up',
                pathMatch: 'full',
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./shared/sign-in-sign-up/sign-in-sign-up.component').then(m => m.SignInSignUpComponent),
                data: { signUp: true },
            },
            {
                path: 'sign-in',
                loadComponent: () => import('./shared/sign-in-sign-up/sign-in-sign-up.component').then(m => m.SignInSignUpComponent),
                data: { signUp: false },
            },
        ],
    },
    { path: 'activity', loadComponent: () => import('./pages/activity/activity.component').then(m => m.ActivityComponent) },
];
