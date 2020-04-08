import { Component, OnInit } from '@angular/core';
import { Visita } from '../../models/visita.model';
import { VisitasService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent implements OnInit {

  otras: Visita[] = [];
  visitas: Visita[] = [];
  _id: string[] = [];

  numeroVisitas: number;
  id: string;

  botones: boolean = true;
  tarjetas: boolean = true;
  visitaForm: FormGroup

  constructor(
    public activateRoute: ActivatedRoute,
    public _visitasService: VisitasService,
    public router: Router
  ) {
    activateRoute.params.subscribe(params => {   //leo el prametro id
      let id = params['id'];

      this.id = id;
      this._id.push(id);

      if (id !== '') {
        this.listar(id);
        this.eliminarCache(id);
      }
    });
    this.numeroVisitas = this.visitas.length;

  }

  ngOnInit() {
    this.visitaForm = new FormGroup({
      _id: new FormControl('', [Validators.maxLength(50)]),
      nombre: new FormControl('', [Validators.maxLength(50)]),
      telefono: new FormControl(null, [Validators.maxLength(50)]),
      direccion: new FormControl('', [Validators.maxLength(50)]),
      estudios: new FormControl(null, [Validators.maxLength(50)]),
      bautizada: new FormControl('', [Validators.maxLength(50)])
    });
  }

  listar(id?: string) {
    this.visitas = [];
    this._visitasService.listarVisitas()
      .subscribe((resp: any) => {
        this.comprobariglesias(resp, this._id[0] || id);
        this.numeroVisitas = this.visitas.length;
      });
  }

  comprobariglesias(resp: any, id: string) {
    var i = 0;
    while (i < resp.visitas.length) {
      if (id === resp.visitas[i].iglesia) {
        this.visitas.push(resp.visitas[i]);
      }
      i = i + 1;
    }
  }

  crear() {
    this._visitasService.crearVisitas(this.id, this.visitaForm.value)
      .subscribe(resp => this.listar());
  }

  actualizar() {
    this._visitasService.actualizarVisita(this.visitaForm.value._id, this.visitaForm.value)
      .subscribe(resp => {
        this.cancelar();
      });
  }

  eliminar() {
    this._visitasService.eliminarVisita(this.visitaForm.value._id, this.visitaForm.value)
      .subscribe(resp => {
        console.log(resp);
        this.cancelar();
      });
  }

  info() {
    this.botones = true;
    this.tarjetas = false;
    this.visitaForm.reset();
  }

  ver(visita) {
    this.botones = false;
    this.tarjetas = false;
    this.visitaForm.patchValue(visita);
  }

  volver() {
    this.router.navigate(['/iglesias', this._id[0]]);
  }

  cancelar() {
    this.tarjetas = true;
    console.log(this._id);
    this.router.navigate(['/visitas', this._id[0]]);
  }

  eliminarCache(id) {
    for (let index = 2; index < this._id.length; index++) {
      this._id.pop();
    }
  }
}
