import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.listar();
  }

  ngOnInit() {
  }

  listar() {
    this._usuarioService.listarUsuarios()
      .subscribe((resp: any) => this.usuarios = resp.usuario);
  }
}
