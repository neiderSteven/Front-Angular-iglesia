import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any[] = [];
  usuario: any;
  id: string;

  constructor() {
  }

  obtenerId() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.id = this.usuario.referencia;

    return this.id;
  }

  obtenerMenu(cargo) {

    if (cargo === 'PASTOR') {

      this.menu = [
        {
          titulo: 'Pastor',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Principal', url: '/principal' },
            { titulo: 'Iglesias', url: '/iglesia' },
          ]
        }]
    } else {

      this.menu = [
        {
          titulo: 'Secretario',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Principal', url: '/principal' },
            { titulo: 'Iglesia', url: `/iglesias/${this.obtenerId()}` }
          ]
        }
      ];
    }
  }
}
