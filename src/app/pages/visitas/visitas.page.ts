import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/client.service';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {



  constructor(private dataService: DataService, private alertCtrl: AlertController) { }

  ngOnInit() {

  }

  async startScan() {
    await this.checkPermissions();
    const result = await BarcodeScanner.startScan();
    console.log(result);

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
          resolve(false);
          BarcodeScanner.openAppSettings();

        }
      }

      ]

        })
      }
    });

  }


}
