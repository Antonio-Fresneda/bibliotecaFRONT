import { Component, OnInit} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Autor } from '../../interfaces/autor';
import { AutorService } from '../../services/autor.service';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'edit-autor',
  templateUrl: 'edit-autor.component.html'
})

export class EditAutorComponent implements OnInit{

  public autoresEditar:Autor[]=[];

  public autor:Autor={} as Autor;

  private translateSubscription: Subscription | null = null;;

  constructor(
    private autorService:AutorService,
    private translate: TranslateService,
    private readonly _modalReference:ModalReference<Autor> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.autor=copy;
      }

      this.translate.addLangs(['en', 'es']);
      this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.translateSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateTranslations();
    });

    this.updateTranslations();
  }

  ngOnDestroy(): void {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  private updateTranslations() {

  }

  editarAutor(term: number, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.autorService.editarAutor(term, nombre, fechaNacimiento, nacionalidad)
      .subscribe(autoresEditar => {
        if (Array.isArray(autoresEditar)) {
          this.autoresEditar = autoresEditar;
        } else {
          this.autoresEditar = [autoresEditar];
        }
      });
  }

  editar(term: number, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.editarAutor(term, nombre, fechaNacimiento, nacionalidad);
    console.log(term,nombre,fechaNacimiento,nacionalidad)
    location.reload()
  }


}
