import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutorPageComponent } from './pages/autor-page.component';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorTableComponent } from './components/autor-table/autor-table.component';
import { AutorTableIdComponent } from './components/autor-table-id/autor-table-id.component';
import { AutorTableFiltrosComponent } from './components/autor-table-filtros/autor-table-filtros.component';
import { AutorTableFiltrosPostComponent } from './components/autor-table-filtros-post/autor-table-filtros-post.component';
import { NgbNavModule,  NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { NewAutorComponent } from './components/new-autor/new-autor.component';
import { EditAutorComponent } from './components/edit-autor/edit-autor.component';
import { SharedModule } from '../rol/shared.module';
import { TranslateModule, } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { DeleteAutorComponent } from './components/delete-autor/delete-autor.component';

@NgModule({
  declarations: [
    AutorTableComponent,
    AutorTableIdComponent,
    AutorTableFiltrosComponent,
    AutorTableFiltrosPostComponent,
    AutorPageComponent,
    NewAutorComponent,
    EditAutorComponent,
    DeleteAutorComponent
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    FormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgFor,
    NgIf,
    NgbAlertModule,
    NgbPaginationModule,
    ModalModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forChild()
  ]
})
export class AutorModule { }
