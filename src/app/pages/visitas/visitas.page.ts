import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/client.service';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements AfterViewInit, OnDestroy {

result = null;
scanActive = false;

  constructor(private dataService: DataService, private alertCtrl: AlertController) { }

  ngAfterViewInit() {
    BarcodeScanner.prepare();

  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }


  async startScan() {
  const allowed= await this.checkPermissions();

  if (allowed){
    this.scanActive=true;
    const result = await BarcodeScanner.startScan();

    if(result.hasContent){
      this.result= result.content;
      this.scanActive= false;
    }
  }


  }

  async checkPermissions() {
    return new Promise (async (resolve, reject) => {
      const status= await BarcodeScanner.checkPermission({force: true});
      console.log(status);
      if(status.granted){
        resolve(true);
      }else if (status.denied){
        const alert = await this.alertCtrl.create({
          header:'No tiene permisos',
          message:'Por favor, active la cámara en las opciones',
          buttons: [{text: 'No',
          role: 'cancel'

        },{text: 'Abrir opciones',
        handler: () => {
          BarcodeScanner.openAppSettings();
          resolve(false);

        }
      }

      ]

        });
      }
    });

  }

  stopScan() {
    BarcodeScanner.stopScan();
    this.scanActive=false;
  }


}
