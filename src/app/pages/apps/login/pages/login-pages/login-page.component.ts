import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.css']

})

export class LoginPageComponent implements OnInit {

  public usuarioLogueado: Usuario[] = [];

  constructor(private loginService : LoginService) { }


  ngOnInit(): void {

  }

  login(email:string,clave :string): void {
    this.loginService.login(email,clave)
      .subscribe(usuarioLogueado => {
        if(Array.isArray(usuarioLogueado)){
        this.usuarioLogueado = usuarioLogueado;
      } else {
        this.usuarioLogueado = [usuarioLogueado];
      }
      console.log(usuarioLogueado)
    });
  }


}










