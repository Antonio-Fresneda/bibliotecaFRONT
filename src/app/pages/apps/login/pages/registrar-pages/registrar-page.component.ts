import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'registrar-page',
  templateUrl: 'registrar-page.component.html',
  styleUrls: ['registrar-page.component.css']

})

export class RegistrarPageComponent implements OnInit {

  public usuarioRegistrado: Usuario[] = [];

  constructor(private loginService : LoginService) { }


  ngOnInit(): void {

  }

  registrar(email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string): void {
    this.loginService.registrarUser(email,clave,nombre,apellidos,telefono,fechaNacimiento)
      .subscribe(usuarioRegistrado => {
        if(Array.isArray(usuarioRegistrado)){
        this.usuarioRegistrado = usuarioRegistrado;
      } else {
        this.usuarioRegistrado = [usuarioRegistrado];
      }
      console.log(usuarioRegistrado)
    });
  }


}










