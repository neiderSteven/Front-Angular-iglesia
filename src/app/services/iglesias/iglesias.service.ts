import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Iglesia } from '../../models/iglesia.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class IglesiasService {

  usuario: Usuario;
  iglesia: Iglesia;
  token: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {
  }

  cargarIglesias() {
    let url = URL_SERVICIOS + '/iglesias';
    return this.http.get(url);
  }

  cargarIglesia(id: string) {
    let url = URL_SERVICIOS + '/iglesias/' + id;
    return this.http.get(url)
      .map((resp: any) => resp.iglesia);
  }

  guardarIglesia(iglesia) {

    let url = URL_SERVICIOS + '/iglesias';

    if (iglesia._id) {
      //actualizando
      url += '/' + iglesia._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, iglesia)
        .map((resp: any) => {
          swal('Iglesia actualizada', resp.iglesia.nombre, 'success');
          return resp.iglesia;
        });
    } else {
      //creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, iglesia)
        .map((resp: any) => {
          swal('Iglesia creada', iglesia.nombre, 'success');
          return resp.iglesia;
        });
    }
  }

  borrarIglesia(id: String) {
    let url = URL_SERVICIOS + '/iglesias/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map(resp => {
        swal('Iglesia eliminada', 'Iglesia eliminada correctamente', 'success');
        return resp;
      });
  }

  buscarIglesias(termino: string) {
    var id = localStorage.getItem('id');
    let url = URL_SERVICIOS + `/busqueda/${id}/iglesias/` + termino;
    return this.http.get(url)
      .map((resp: any) => resp.iglesias);
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'iglesias', id)
      .then((resp: any) => {
        swal('Imagen actualizada', resp.iglesia.nombre, 'success');
      })
      .catch(resp => {
        console.log(resp);
      });
  }
}
