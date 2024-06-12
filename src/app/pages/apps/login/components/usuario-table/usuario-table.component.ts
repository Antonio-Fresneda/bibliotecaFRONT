import { ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Usuario } from '../../interfaces/usuario';
import { DeleteUsuarioComponent } from '../delete-usuario/delete-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';




@Component({
  selector: 'usuario-table',
  templateUrl: 'usuario-table.component.html',
})

export class UsuarioTableComponent implements OnDestroy {

  @Input() titulo: string = '';
  @Input() columnaEmail: string = '';
  @Input() columnaNombre: string = '';
  @Input() columnaApellidos: string = '';
  @Input() columnaTelefono: string = '';
  @Input() columnaFecha: string = '';
  @Input() columnaRol: string = '';
  @Input() columnaAcciones: string = '';

  private translateSubscription: Subscription;

  constructor(
    private readonly _modalService:ModalService,
    private readonly translate: TranslateService,
    private readonly datePipe: DatePipe,
    private readonly cdr: ChangeDetectorRef
  ){
    this.translateSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateDateFormats();
    });
  }

  ngOnDestroy() {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  @Input()
  public usuarios:Usuario[]=[];

  public currentPage = 1;
  public pageSize = 5;

  get paginatedUsuarios() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.usuarios.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  @ViewChild('txtValor') txtValor: any;



  deleteUsuario(usuario: Usuario): void {
    this._modalService.show<Usuario>(DeleteUsuarioComponent, {
      title: 'Borrar Usuario',
      model: usuario,
    }).result().subscribe(borrarUsuario => {
      const index = this.usuarios?.findIndex(g => g.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = borrarUsuario;
      }
    });
  }

  editUsuario(usuario: Usuario): void {
    this._modalService.show<Usuario>(EditUsuarioComponent, {
      title: 'Editar Usuario',
      model: usuario,
    }).result().subscribe(editarLibros => {
      const index = this.usuarios?.findIndex(g => g.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = editarLibros;
      }
    });
  }

  getDateFormat(lang: string): string {
    switch (lang) {
      case 'es':
        return 'dd/MM/yyyy';
      case 'en':
        return 'yyyy/MM/dd';
      default:
        return 'dd/MM/yyyy';
    }
}

updateDateFormats() {
this.usuarios = this.usuarios.map(usuario => {
  if (typeof usuario.fechaNacimiento === 'string') {
    const fecha = this.parseDate(usuario.fechaNacimiento);
    if (fecha) {
      return { ...usuario, fechaNacimiento: fecha };
    } else {
      console.error(`Invalid date found for author ${usuario.nombre}: ${usuario.fechaNacimiento}`);
      return usuario;
    }
  }
  return usuario;
});
this.cdr.detectChanges();
}


parseDate(fecha: string): Date | null {
const dateParts = fecha.split('/');
if (dateParts.length === 3) {
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const year = parseInt(dateParts[2], 10);
  const date = new Date(year, month, day);
  if (!isNaN(date.getTime())) {
    return date;
  }
}
return null;
}

formatFecha(fecha: string | Date): string {
const currentLang = this.translate.currentLang || 'en';
const dateFormat = this.getDateFormat(currentLang);
let date: Date | null = null;

if (typeof fecha === 'string') {
  date = new Date(fecha);
  if (isNaN(date.getTime())) {
    date = this.parseDate(fecha);
  }
} else if (fecha instanceof Date) {
  date = fecha;
}

if (date && !isNaN(date.getTime())) {
  return this.datePipe.transform(date, dateFormat, undefined, currentLang) || '';
} else {
  console.error(`Invalid date: ${fecha}`);
  return 'Fecha inválida';
}
}

}
