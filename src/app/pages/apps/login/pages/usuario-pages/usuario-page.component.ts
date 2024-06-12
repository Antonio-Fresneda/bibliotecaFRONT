import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';
import { NewUsuarioComponent } from '../../components/new-usuario/new-usuario.component';
import { EditUsuarioComponent } from '../../components/edit-usuario/edit-usuario.component';
import { DialogService } from '../../../error/dialog.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'usuario-page',
  templateUrl: 'usuario-page.component.html',
  styleUrls: ['usuario-page.component.css']
})

export class UsuarioPageComponent implements OnInit {

  active = 1;

  public usuarios: Usuario[] = [];

  public usuarioId:Usuario[] = [];

  public usuarioCrear:Usuario[]=[];

  public usuarioEditar:Usuario[]=[]

  private translateSubscription: Subscription | null = null;;

  constructor(
    private usuarioService: LoginService,
    private readonly _modalService:ModalService,
    private dialogService: DialogService,
    private translate: TranslateService,


  ) { }
  @ViewChild('txtValor') txtValor: any;

  ngOnInit(): void {
    this.usuarioService.searchUsuario().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
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
    this.usuarios = [...this.usuarios];
  }
  busquedaInicial(): void {
  this.usuarioService.searchUsuario().subscribe(
    usuarios => {
      this.usuarios = usuarios;
    }
  );

  this.txtValor.nativeElement.value = '';
  }

  public createUsuario():void{
    this._modalService.show<Usuario>(NewUsuarioComponent,{
      title:'Crear Usuario'}
    ).result()
      .subscribe(newUsuario =>{
        this.usuarios?.push(newUsuario);
      })

  }








}










