import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { SidebarService } from '../shared/sidebar.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _sidebarService: SidebarService,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  /*loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      });
  }*/

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.Usuario);
        this.obtenerMenu(resp.Usuario.cargo);
        return true;
      })
      .catch(err => {
        swal('Error de login', err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  obtenerMenu(cargo) {
    this._sidebarService.obtenerMenu(cargo);
  }

  listarUsuarios(){
    let url = URL_SERVICIOS + '/usuarios';

    return this.http.get(url);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuarios';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        console.log(resp);
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
      .catch(err => {
        swal(err.error.mensaje, err.error.errors.errors.email.message, 'error');
        return Observable.throw(err);
      });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuarios/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .map((resp: any) => {
        //this.usuario = resp.usuario;
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');

        return true;
      });
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;

        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id, this.token, this.usuario);
        console.log(resp);
      })
      .catch(resp => {
        console.log(resp);
      });
  }
}
