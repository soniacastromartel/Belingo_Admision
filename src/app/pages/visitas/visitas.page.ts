import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/client.service';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalVisitaPage } from '../modal-visita/modal-visita.page';



@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements AfterViewInit, OnDestroy {


  client = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    dni: '',
    telefono: '',
    sexo: '',
    email: '',
    img: '',
    fechaNaci: '',
  };

result = null;
scanActive = false;

constructor(private dataService: DataService,
  private alertCtrl: AlertController,
  private modalCtrl: ModalController) { }


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

  async showModal(dni) {
    const modal = await this.modalCtrl.create({
      component: ModalVisitaPage,
      componentProps: {
        dni
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
    // client = {
    //   nombre: data.nombre,
    //   apellido1: data.apellido1,
    //   apellido2: data.apellido2,
    //   dni: data.dni,
    //   telefono: data.telefono,
    //   sexo: data.sexo,
    //   email: data.email,
    //   img: data.img,
    //   fechaNaci: data.fechaNaci,
    //   conflictivo: data.conflictivo,
    // };
    // this.updateClient(id, client);
    // this.ionList.closeSlidingItems();
    // console.log(id);
    // console.log(client);
    // console.log(data);
  }


}
