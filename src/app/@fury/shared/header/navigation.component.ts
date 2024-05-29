import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';  // Importa Router
import { LoginService } from 'src/app/pages/apps/login/services/login.service';
; // Asegúrate de importar tu servicio

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(private modalService: NgbModal, private loginService: LoginService, private router: Router) { } // Inyecta LoginService y Router

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Launch Admin',
      subject: 'Just see my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have an event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-warning',
      icon: 'ti-user',
      title: 'Pavan Kumar',
      subject: 'Just see my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan Kumar',
      subject: 'Just see my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Singh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan Kumar',
      subject: 'Just see my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us'
    },
    {
      language: 'Español',
      code: 'es',
      icon: 'es'
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr'
    },
    {
      language: 'German',
      code: 'de',
      icon: 'de'
    }
  ];

  ngAfterViewInit() { }

  // Nuevo método logout
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
