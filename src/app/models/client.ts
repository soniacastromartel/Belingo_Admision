import { IClient } from '../interfaces/iclient';
import { set, get } from 'lodash-es';

export class Client  {

  constructor(data: undefined) {
    set(this, 'data', data);
  }

  // get id() {
  //   return get(this, 'data.id');
  // }

get dni() {
  return get(this, 'data.dni');
}

  get nombre() {
    return get(this, 'data.nombre');
  }

  get apellido1() {
    return get(this, 'data.apellido1');
  }

  get apellido2() {
    return get(this, 'data.apellido2');
  }

  get sexo() {
    return get(this, 'data.sexo');
  }

  get telefono() {
    return get(this, 'data.telefono');
  }

  get email() {
    return get(this, 'data.email');
  }

  get img() {
    return get(this, 'data.img');
  }

  get fechaNaci(){
    return get(this, 'data.fechaNaci');
  }

  get key() {
    return get(this, 'data.key');
  }

  // get img() {
  //   return get(this, 'data.img');
  // }
}
