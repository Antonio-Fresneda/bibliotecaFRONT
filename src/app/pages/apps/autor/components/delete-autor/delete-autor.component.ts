import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../interfaces/autor';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'delete-autor',
  templateUrl: 'delete-autor.component.html'
})

export class DeleteAutorComponent  implements OnInit  {

  public generoBorrar:Autor[]=[];

  public autor:Autor={} as Autor;

  private translateSubscription: Subscription | null = null;;

  constructor(
    private autorService: AutorService,
    private translate: TranslateService,
    private readonly _modalReference:ModalReference<Autor> ) {

      this.translate.addLangs(['en', 'es']);
      this.translate.setDefaultLang('en');

      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.autor=copy;
      }

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

  private updateTranslations() {}

  deletedByAutorId(term:number){
    this.autorService.deleteAutorById(term).subscribe(autoresId => {
      if (Array.isArray(autoresId)) {
        this.generoBorrar = autoresId;
      } else {
        this.generoBorrar = [autoresId];
      }
      console.log(autoresId)
      location.reload()
    });
  }

}
