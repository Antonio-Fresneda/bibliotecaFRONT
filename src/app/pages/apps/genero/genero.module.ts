import { NgModule } from '@angular/core';
import { GeneroTableComponent } from './components/genero-table/genero-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/layouts/component/component.module';
import { GeneroPageComponent } from './pages/genero-page.component';
import { GeneroRoutingModule } from './genero-routing';
import { GeneroTableFiltrosComponent } from './components/genero-table-filtros/genero-table-filtros.component';
import { NgbNavModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { EditGeneroComponent } from './components/edit-genero/edit-genero.component';
import { SharedModule } from '../rol/shared.module';


@NgModule({
  declarations: [
   GeneroTableComponent,
   GeneroPageComponent,
   GeneroTableFiltrosComponent,
   EditGeneroComponent

  ],
  imports: [
    CommonModule,
    GeneroRoutingModule,
    ComponentsModule,
    FormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgFor,
    NgIf,
    NgbAlertModule,
    NgbPaginationModule,
    ModalModule,
    SharedModule
  ]

})
export class GeneroModule { }
