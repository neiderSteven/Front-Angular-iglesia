import { Component, OnInit } from '@angular/core';
import { Iglesia } from '../../models/iglesia.model';
import { IglesiasService } from '../../services/iglesias/iglesias.service';
import { ActivatedRoute, Router } from '@angular/router'; //poder leer parametros
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-iglesia',
  templateUrl: './iglesia.component.html',
  styleUrls: ['./iglesia.component.css']
})
export class IglesiaComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  iglesia: Iglesia = new Iglesia('', '', '', '', null, '', '');

  usu: any;
  imagenSubir: File;
  imagenTemp: any;
  botonPastor: boolean = true;
  botonVisitas: boolean = true;

  constructor(
    public _iglesiaService: IglesiasService,
    public activateRoute: ActivatedRoute,
    public router: Router
  ) {

    this.usu = JSON.parse(localStorage.getItem("usuario"));

    if (this.usu.cargo !== 'PASTOR') {
      this.botonPastor = false;
    }

    activateRoute.params.subscribe(params => {   //leo el prametro id
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargar(id);
      } else {
        this.ocultar();
      }
    });
  }

  ngOnInit() {
  }

  cargar(id: string) {
    this._iglesiaService.cargarIglesia(id)
      .subscribe((iglesia: any) => {
        this.iglesia = iglesia
      });
  }

  guardar(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this._iglesiaService.guardarIglesia(this.iglesia)
      .subscribe(iglesia => {
        this.iglesia._id = iglesia._id;
        this.router.navigate(['/iglesias/', iglesia._id]);
      });
  }

  seleccionImgen(archivo: File) {
    if (!archivo) {
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._iglesiaService.cambiarImagen(this.imagenSubir, this.iglesia._id);
  }

  ocultar() {
    this.botonVisitas = false;
  }
}
