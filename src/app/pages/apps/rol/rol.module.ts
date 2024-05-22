import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/layouts/component/component.module';
import { NgbNavModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { RolRoutingModule } from './rol-routing';
import { RolTableComponent } from './components/rol-table/rol-table.component';
import { RolPageComponent } from './pages/rol-page.component';
import { NewRolComponent } from './components/new-rol/new-rol.component';
import { EditRolComponent } from './components/edit-rol/edit-rol.component';



@NgModule({
  declarations: [
    RolTableComponent,
    RolPageComponent,
    NewRolComponent,
    EditRolComponent

  ],
  imports: [
    CommonModule,
    RolRoutingModule,
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
export class RolModule { }
