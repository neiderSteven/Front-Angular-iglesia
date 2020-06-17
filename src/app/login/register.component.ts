import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  referencia: boolean = false;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      distrito: new FormControl(null, Validators.required),
      cargo: new FormControl('PASTOR', Validators.required),
      referencia: new FormControl(''),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });
  }

  registrarUsuario() {

    console.log(this.forma.value);

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.telefono,
      this.forma.value.distrito,
      this.forma.value.cargo,
      this.forma.value.referencia
    );

    console.log('usuario a registar' + usuario.nombre);

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);
        localStorage.setItem('usuario', JSON.stringify(resp));
        this.router.navigate(['/login'])
      });
  }

  verificarCargo() {
    if (this.forma.value.cargo === 'SECRETARIO') {
      this.referencia = true;
      console.log('hola secretario');
    } else {
      this.referencia = false;
    }
  }
}
