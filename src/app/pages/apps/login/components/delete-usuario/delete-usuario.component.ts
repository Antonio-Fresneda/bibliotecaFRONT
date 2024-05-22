import { Component, OnInit } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'delete-usuario',
  templateUrl: 'delete-usuario.component.html'
})

export class DeleteUsuarioComponent  {

  public usuarioBorrar:Usuario[]=[];

  public usuario:Usuario={} as Usuario;

  constructor(
    private usuarioService: LoginService,
    private readonly _modalReference:ModalReference<Usuario> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.usuario=copy;
      }

  }
  deletedByLibroId(term:string){
    this.usuarioService.deleteUsuarioById(term).subscribe(libroId => {
      if (Array.isArray(libroId)) {
        this.usuarioBorrar = libroId;
      } else {
        this.usuarioBorrar = [libroId];
      }
      console.log(libroId)
      location.reload()
    });
  }

}
