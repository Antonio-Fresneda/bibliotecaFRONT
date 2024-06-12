import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { NavigationComponent } from './@fury/shared/header/navigation.component';
import { SidebarComponent } from './@fury/shared/sidebar/sidebar.component';

import { AppRoutingModule, Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './@fury/shared/spinner.component';
import { ErrorDialogComponent } from './pages/apps/error/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GeneroModule } from './pages/apps/genero/genero.module';
import { SharedModule } from './pages/apps/rol/shared.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeEs);
registerLocaleData(localeEs, 'eu');

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    SidebarComponent,
    AppRoutingModule,
    SharedModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LOCALE_ID, useValue: 'eu' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
