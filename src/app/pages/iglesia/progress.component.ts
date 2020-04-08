import { Component, OnInit } from '@angular/core';
import { IglesiasService } from '../../services/iglesias/iglesias.service';
import { Iglesia } from '../../models/iglesia.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  otras: Iglesia[] = [];
  iglesias: Iglesia[] = [];

  constructor(
    public _iglesiaService: IglesiasService
  ) {}

  ngOnInit() {
    this.listarIglesias();
  }

  listarIglesias() {
    this.iglesias = [];
    this._iglesiaService.cargarIglesias()
      .subscribe((resp: any) => {
        this.comprobariglesias(resp);
        
      });
  }
  
  comprobariglesias(resp) {
    var id = localStorage.getItem('id');
    var i = 0;
    while (i < resp.iglesias.length) {
      if (id === resp.iglesias[i].pastor) {
        this.iglesias.push(resp.iglesias[i]);
      } else {
        this.otras.push(resp.iglesias[i]);
      }
      i = i + 1;
    }
  }

  borrar(iglesia) {
    this._iglesiaService.borrarIglesia(iglesia._id)
      .subscribe(() => {
        this.listarIglesias();
      });
  }

  buscarIglesias(termino: string) {
    if (termino.length < 1) {
      this.listarIglesias();
      return;
    }

    this._iglesiaService.buscarIglesias(termino)
      .subscribe((iglesias: Iglesia[]) => {
        this.iglesias = iglesias;
      });
  }
}
