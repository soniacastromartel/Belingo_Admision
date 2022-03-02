import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/icomponent';
import { DataService } from './services/client.service';

//Capacitor GoogleMaps
import {CapacitorGoogleMaps} from '@capacitor-community/capacitor-googlemaps-native';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  componentes: Observable<Componente[]>;

  constructor(
    private dataService: DataService,
    // private translateService: TranslateService,
    // private globalization: Globalization
  ) {
    // this.checkDarkTheme();
    // this.translateService.setDefaultLang('es');
    // this.getLanguage();
    //  CapacitorGoogleMaps.initialize({
    //   key: environment.mapsKey
    // });
  }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOptions();
  }

  // getLanguage() {
  //   this.globalization
  //     .getPreferredLanguage()
  //     .then((res) => console.log(res))
  //     .catch((e) => console.log(e));
  // }

  // checkDarkTheme() {
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  //   console.log(prefersDark);
  //   if (prefersDark.matches){
  //     document.body.classList.toggle ('dark');
  //   }
  // }
}
