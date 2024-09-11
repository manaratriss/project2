import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptor/header.interceptor';
import { errorsInterceptor } from './core/interceptor/errors.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration:"top"}),withViewTransitions()), 
    provideClientHydration(),
    importProvidersFrom(HttpClientModule,BrowserAnimationsModule),
    provideToastr(),
    provideAnimations(),
     provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorsInterceptor, loadingInterceptor])
  ),
    importProvidersFrom(
      NgxSpinnerModule,

    TranslateModule.forRoot({
     defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
       
    })
  )
  ],

 
};
