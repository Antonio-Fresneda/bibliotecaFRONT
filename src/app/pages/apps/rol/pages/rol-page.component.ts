import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Rol } from '../interfaces/rol';
import { RolService } from '../services/rol.service';
import { NewRolComponent } from '../components/new-rol/new-rol.component';
import { DialogService } from '../../error/dialog.service';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'rol-page',
  templateUrl: 'rol-page.component.html',
  styleUrls: ['rol-page.component.css']
})

export class RolPageComponent implements OnInit {

  active = 1;

  public rol: Rol[] = [];

  public rolId:Rol[] = [];

  public rolCrear:Rol[]=[];

  public rolEditar:Rol[]=[]


  private translateSubscription: Subscription | null = null;



  constructor(
    private rolService: RolService,
    private readonly _modalService:ModalService,
    private dialogService: DialogService,
    private translate: TranslateService,


  ) { }
  @ViewChild('txtValor') txtValor: any;

  ngOnInit(): void {
    this.rolService.searchRol().subscribe(
      rol => {
      this.rol = rol;
    } ,
    error => {
      if (error.status === 403) {
        this.dialogService.openErrorDialog('Error 403 Forbidden: No tienes acceso a este recurso.');
      }
    }
  );
  this.translateSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.updateTranslations();
  });

  this.updateTranslations();

  }
  private updateTranslations() {
    this.rol = [...this.rol];
  }

  busquedaInicial(): void {
  this.rolService.searchRol().subscribe(
    rol => {
      this.rol = rol;
    }
  );

  this.txtValor.nativeElement.value = '';
  }

  public createRol():void{
    this._modalService.show<Rol>(NewRolComponent,{
      title:'Crear Rol'}
    ).result()
      .subscribe(newRol =>{
        this.rol?.push(newRol);
      })

  }






}










