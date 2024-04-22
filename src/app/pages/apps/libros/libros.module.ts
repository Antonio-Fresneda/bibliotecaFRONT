import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/layouts/component/component.module';
import { LibroPageComponent } from './pages/libro-page.component';
import { LibroRoutingModule } from './libro-routing';
import { LibroTableComponent } from './components/libro-table/libro-table.component';
import { LibroTableFiltrosComponent } from './components/libro-table-filtros/libro-table-filtros.component';
import { NgbNavModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { EditLibroComponent } from './components/edit-libro/edit-libro.component';



@NgModule({
  declarations: [
   LibroPageComponent,
   LibroTableComponent,
   LibroTableFiltrosComponent,
   EditLibroComponent


  ],
  imports: [
    CommonModule,
    LibroRoutingModule,
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
export class LibroModule { }
