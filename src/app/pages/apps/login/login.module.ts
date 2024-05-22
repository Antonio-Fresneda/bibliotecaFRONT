import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing';
import { NgbNavModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { LoginPageComponent } from './pages/login-pages/login-page.component';
import { UsuarioTableComponent } from './components/usuario-table/usuario-table.component';
import { UsuarioPageComponent } from './pages/usuario-pages/usuario-page.component';
import { NewUsuarioComponent } from './components/new-usuario/new-usuario.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    UsuarioTableComponent,
    UsuarioPageComponent,
    NewUsuarioComponent,
    EditUsuarioComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgFor,
    NgIf,
    NgbAlertModule,
    NgbPaginationModule,
    ModalModule
  ]

})
export class LoginModule { }
