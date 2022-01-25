export interface Session {
  key?: string;
  fechaHoraInicio: string;
  fechaHoraFin?: string;
  usuario: string;
  aforo: number;
  //hombres: number;
  //mujeres: number;
  //locales: number;
  //extranjeros: number;
}
