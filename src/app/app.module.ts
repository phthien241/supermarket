import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import {MSAL_GUARD_CONFIG, MsalModule, MsalService, MSAL_INSTANCE, MsalGuardConfiguration, MsalGuard } from '@azure/msal-angular';
import { InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { ErrorComponent } from './screen/error/error.component';
import { environment } from 'src/environment';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): PublicClientApplication {

  return new PublicClientApplication({
    auth: {
      clientId: environment.auth.clientId,
      authority: environment.auth.authority,
      redirectUri: environment.auth.redirectUri,
      knownAuthorities: [`${environment.auth.knownAuthorities}`]
    },
    cache: {
      cacheLocation: 'localStorage'
    },
    system: {
      allowNativeBroker: false,
    }
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [`${environment.auth.scope}`]
    },
    loginFailedRoute:"login"
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    MsalModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    MsalGuard,
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
