// import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing-module';
// import { App } from './app';

// import { MsalModule, MsalRedirectComponent, MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
// import { PublicClientApplication } from '@azure/msal-browser';
// import { Login } from './auth/login/login';

// export function MSALInstanceFactory(){
//   return new PublicClientApplication({
//     auth: {
//       clientId: '2b2c5b78-e1fc-41e6-88e1-20d591febee0',
//       redirectUri: 'http://localhost:4200'
//     }
//   });
// }

// @NgModule({
//   declarations: [
//     App,
//     Login
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     MsalModule
//   ],
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     {provide: MSAL_INSTANCE,
//     useFactory: MSALInstanceFactory},
//     MsalService
    
//   ],
//   bootstrap: [App]
// })
// export class AppModule { }
import { APP_INITIALIZER,NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { MsalModule, MsalService, MsalRedirectComponent, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { Login } from './auth/login/login';
import { MsalInit } from './services/msal-init';
import { Home } from './pages/home/home';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';

export function initializeMsal(msalInitService: MsalInit): () => Promise<void> {
  return () => msalInitService.initialize();
}

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '2b2c5b78-e1fc-41e6-88e1-20d591febee0',
    redirectUri: 'http://localhost:4200'
  }
});

@NgModule({
  declarations: [
    App,
    Login,
    Home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(
      msalInstance,
      { interactionType: InteractionType.Redirect },
      { interactionType: InteractionType.Redirect, protectedResourceMap: new Map() }
    )
  ],
  providers: [
    MsalService,
    {
      provide: APP_INITIALIZER, 
          useFactory: () => () => msalInstance.initialize(),
      multi: true
    },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
