import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../interfaces/autor';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/pages/language.service';


@Component({
  selector: 'new-autor',
  templateUrl: 'new-autor.component.html'
})

export class NewAutorComponent implements OnInit {

  public autoresCrear:Autor[]=[];

  private translateSubscription: Subscription | null = null;;

  constructor(
    private autorService: AutorService,
    private readonly _ModalReference:ModalReference<Autor>,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
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

  crearAutor( nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.autorService.crearAutor( nombre, fechaNacimiento, nacionalidad)
      .subscribe(autoresCrear => {
        if (Array.isArray(autoresCrear)) {
          this.autoresCrear = autoresCrear;
        } else {
          this.autoresCrear = [autoresCrear];
        }
      }, error => {
        console.error('Error al crear autor:', error);
      });
  }

  crear( nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.crearAutor( nombre, fechaNacimiento, nacionalidad);
    location.reload()
  }




}
