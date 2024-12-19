import { ApplicationConfig } from '@angular/core';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { customInterceptor } from './modules/authentication/interceptor/custom.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideRouter(routes),
    provideHttpClient(withFetch()), // Solving Warning ' Enable Fetching ' for better performance
    provideHttpClient(withInterceptors([customInterceptor])),
  ],
};
