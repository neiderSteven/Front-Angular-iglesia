import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  email: string;
  numeroMensajes: number;

  constructor(public _usuarioService: UsuarioService) {
    this.email = localStorage.getItem('email');
    this.numeroMensajes = 1;
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }
}
