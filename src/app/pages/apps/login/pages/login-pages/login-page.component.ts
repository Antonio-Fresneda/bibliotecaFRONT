import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public errorMensaje: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  login(email: string, clave: string): void {
    this.loginService.login(email, clave).subscribe(
      response => {
        if (response && response.token) {
          this.router.navigate(['/dashboard']);

        } else {
          this.errorMensaje = 'Credenciales incorrectas';
        }
      },
      error => {
        console.error(error);
        this.errorMensaje = 'Credenciales incorrectas';
      }
    );
  }
}











