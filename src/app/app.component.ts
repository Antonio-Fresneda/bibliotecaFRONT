import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService ){
    this.setAppLanguage();
  }

  setAppLanguage() {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(browserLang);
    this.translate.setDefaultLang('eu');
    const browserLang2 = this.translate.getBrowserLang() || 'eu';
    this.translate.use(browserLang2);
}

}
