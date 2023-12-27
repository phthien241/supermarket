import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';

export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '624d74bd-acc1-487d-ab20-5c82d5da7e79',
      authority: 'https://adAzureBestBuy.b2clogin.com/adAzureBestBuy.onmicrosoft.com/B2C_1_Best-Buy-SignIn-SignUp',
      redirectUri: 'http://localhost:4200/',
      knownAuthorities: ['adAzureBestBuy.b2clogin.com']
    },
    cache: {
      cacheLocation: 'localStorage'
    },
    system: {
      allowNativeBroker: false, // Disables native brokering support
  }
  });
}

@NgModule({
  declarations: [
    AppComponent,
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
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
