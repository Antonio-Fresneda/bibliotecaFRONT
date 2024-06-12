import { Component, Input, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Autor } from '../../interfaces/autor';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { EditAutorComponent } from '../edit-autor/edit-autor.component';
import { DeleteAutorComponent } from '../delete-autor/delete-autor.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'autor-table',
  templateUrl: 'autor-table.component.html',
  providers: [DatePipe]
})
export class AutorTableComponent implements OnDestroy {

  @Input() titulo: string = '';
  @Input() columnaNombre: string = '';
  @Input() columnaFecha: string = '';
  @Input() columnaNacionalidad: string = '';
  @Input() columnaAcciones: string = '';
  @Input() autores: Autor[] = [];

  public currentPage = 1;
  public pageSize = 5;
  private translateSubscription: Subscription;

  constructor(
    private readonly _modalService: ModalService,
    private readonly translate: TranslateService,
    private readonly datePipe: DatePipe,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.translateSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateDateFormats();
    });
  }

  ngOnDestroy() {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  get paginatedAutores() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.autores.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  editAutor(autor: Autor): void {
    this._modalService.show<Autor>(EditAutorComponent, {
      title: 'Editar Autor',
      model: autor,
    }).result().subscribe(editarAutor => {
      const index = this.autores?.findIndex(g => g.id === autor.id);
      if (index !== -1) {
        this.autores[index] = editarAutor;
      }
    });
  }

  deleteAutor(autor: Autor): void {
    this._modalService.show<Autor>(DeleteAutorComponent, {
      title: 'Borrar Autor',
      model: autor,
    }).result().subscribe(borrarGenero => {
      const index = this.autores?.findIndex(g => g.id === autor.id);
      if (index !== -1) {
        this.autores[index] = borrarGenero;
      }
    });
  }

    getDateFormat(lang: string): string {
          switch (lang) {
            case 'es':
              return 'dd/MM/yyyy';
            case 'en':
              return 'dd/MM/yyyy';
            case 'eu':
              return 'yyyy/MM/dd';
            default:
              return 'dd/MM/yyyy';
          }
    }

    updateDateFormats() {
      this.autores = this.autores.map(autor => {
        if (typeof autor.fechaNacimiento === 'string') {
          const fecha = this.parseDate(autor.fechaNacimiento);
          if (fecha) {
            return { ...autor, fechaNacimiento: fecha };
          } else {
            console.error(`Invalid date found for author ${autor.nombre}: ${autor.fechaNacimiento}`);
            return autor;
          }
        }
        return autor;
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
