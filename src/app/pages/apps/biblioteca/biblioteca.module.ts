import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/layouts/component/component.module';
import { BibliotecaRoutingModule } from './biblioteca-routing';
import { BibliotecaTableComponent } from './components/biblioteca-table/biblioteca-table.component';
import { BiblitoecaPageComponent } from './pages/biblioteca-page.component';
import { BibliotecaTableFiltrosComponent } from './components/biblioteca-table-filtros/biblioteca-table-filtros.component';
import { NgbNavModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { EditBibliotecaComponent } from './components/edit-biblioteca/edit-biblio.component';


@NgModule({
  declarations: [
    BibliotecaTableComponent,
    BiblitoecaPageComponent,
    BibliotecaTableFiltrosComponent,
    EditBibliotecaComponent,
  ],
  imports: [
    CommonModule,
    BibliotecaRoutingModule,
    ComponentsModule,
    FormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgFor,
    NgIf,
    NgbAlertModule,
    NgbPaginationModule,
    ModalModule

  ]

})
export class BibliotecaModule { }
