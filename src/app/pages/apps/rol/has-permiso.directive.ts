import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from '../login/services/login.service';


@Directive({
  selector: '[appHasPermiso]'
})
export class HasPermisoDirective {
  private currentPermisos: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) {
    const permisos = this.loginService.getPermisos();
    if (permisos) {
      this.currentPermisos = permisos.split(', ');
    }
  }

  @Input() set appHasPermiso(requiredPermisos: string) {
    const permisosArray = requiredPermisos.split('||').map(permiso => permiso.trim());
    const hasPermiso = permisosArray.some(permiso => this.currentPermisos.includes(permiso));

    if (hasPermiso) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
