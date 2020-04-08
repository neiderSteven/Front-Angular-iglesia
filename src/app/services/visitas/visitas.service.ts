import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visita } from '../../models/visita.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  visita: Visita;

  constructor(
    public http: HttpClient
  ) {
  }

  listarVisitas() {
    let url = URL_SERVICIOS + '/visitas';
    return this.http.get(url);
  }

  crearVisitas(id: string, visitas) {
    let url = URL_SERVICIOS + '/visitas/' + id;
    return this.http.post(url, visitas)
      .map((resp: any) => {
        swal('Visita creada', resp.visita.nombre, 'success');
        return resp.visita;
      });
  }

  actualizarVisita(id, visita) {
    let url = URL_SERVICIOS + '/visitas/' + id;
    return this.http.put(url, visita)
      .map((resp: any) => {
        swal('Visita actualizada', resp.visita.nombre, 'success');
        return resp.visita;
      });
  }
  
  eliminarVisita(id, visita) {
    let url = URL_SERVICIOS + '/visitas/' + id;
    return this.http.delete(url, visita)
      .map((resp: any) => {
        swal('Visita eliminda', resp.visita.nombre, 'success');
        return resp.visita;
      });
  }
}
