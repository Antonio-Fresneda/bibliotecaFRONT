import { Component, OnInit } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Rol } from '../../interfaces/rol';
import { RolService } from '../../services/rol.service';




@Component({
  selector: 'delete-rol',
  templateUrl: 'delete-rol.component.html'
})

export class DeleteRolComponent  {

  public rolBorrar:Rol[]=[];

  public rol:Rol={} as Rol;

  constructor(
    private rolService: RolService,
    private readonly _modalReference:ModalReference<Rol> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.rol=copy;
      }

  }
  deletedByRolId(term:string){
    this.rolService.deleteRolById(term).subscribe(libroId => {
      if (Array.isArray(libroId)) {
        this.rolBorrar = libroId;
      } else {
        this.rolBorrar = [libroId];
      }
      console.log(libroId)
      location.reload()
    });
  }

}
