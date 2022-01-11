import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/icomponent';
import { DataService } from './services/client.service';

import {Globalization} from '@ionic-native/globalization/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  componentes: Observable<Componente[]>;

  constructor(private dataService: DataService,
    // private translateService: TranslateService,
    private globalization: Globalization) {
      // this.translateService.setDefaultLang('es');
      this.getLanguage();
    }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOptions();
  }

  getLanguage() {
    this.globalization.getPreferredLanguage().then (res=> console.log(res)).catch(e=> console.log(e));
  }
}
