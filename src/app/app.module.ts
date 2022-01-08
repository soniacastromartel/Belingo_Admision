/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {AngularFireStorageModule } from '@angular/fire/compat/storage';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Globalization } from '@ionic-native/globalization/ngx';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { fromPairs } from 'lodash-es';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { locale } from 'moment';
registerLocaleData(localeEs, 'es');

// eslint-disable-next-line @typescript-eslint/naming-convention
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader (http, '/assets/i18n/','.json');
// }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule

    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpClientModule,
    //     deps: [HttpClient]

    //   }
    // })

  ],
  providers: [
    AngularFirestoreModule,
    Globalization,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
