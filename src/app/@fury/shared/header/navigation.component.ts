import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/apps/login/services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  styleUrls: ['navigation.component.css'],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private translate: TranslateService
  ) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
