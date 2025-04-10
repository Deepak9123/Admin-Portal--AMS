import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { provideLottieOptions } from 'ngx-lottie';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    NgOtpInputModule,
    NgxPaginationModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    importProvidersFrom(
      NgxUiLoaderModule.forRoot({}),
      NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
      NgOtpInputModule
    ),
  ],
};
