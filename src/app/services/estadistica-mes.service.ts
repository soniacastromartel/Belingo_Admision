import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Imonthstats } from '../interfaces/imonthstats';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaMesService {
  months: AngularFireList<any>;
  month: AngularFireObject<Imonthstats>;

  dbPath = '/estadística_mes';
  ref= null;

  constructor( private afd: AngularFireDatabase) {
    this.months= this.afd.list(this.dbPath);
    this.ref = this.afd.database.ref(this.dbPath);
  }

  getMonthStats() {
    this.months= this.afd.list(this.dbPath);
    return this.months;
  }

  getMonthById(id: string) {
    this.month= this.afd.object (this.dbPath+'/'+ id);
    return this.month;
  }

  createMonthStats(month: Imonthstats) {
    // No se puede hacer un push ya que se generaría un key automático y queremos que el key sea el nombre del mes??
   return this.ref.child(month.key).set(month);
  }

  deleteMonthStats(id: string) {
    this.month= this.afd.object (this.dbPath+'/'+ id);
    this.month.remove();
  }

  updateMonthStats(id: string, month: Imonthstats){
    this.month = this.afd.object(this.dbPath+'/'+ id);
    console.log(this.month);
    return this.month.update({
      hombres: month.hombres,
      mujeres: month.mujeres
    });
  }




}
