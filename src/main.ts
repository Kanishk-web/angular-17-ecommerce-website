import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  // appConfig,
  providers: [
    appConfig.providers,
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule), // Add this to enable animations
  ],
}).catch((err) => console.error(err));
