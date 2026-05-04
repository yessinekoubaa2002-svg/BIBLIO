import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  sidebarVisible: boolean = false;
  items: any[] = [];
  username: string = '';

  ngOnInit(): void {

    const role = localStorage.getItem('role');
    this.username = localStorage.getItem('username') ?? 'User';

    if (role === 'ADMIN') {
      this.items = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/admin' },
        { label: 'Users', icon: 'pi pi-users', routerLink: '/admin/users' },
        { label: 'Books', icon: 'pi pi-book', routerLink: '/admin/livres' },
        { label: 'Categories', icon: 'pi pi-tags', routerLink: '/admin/categories' }
      ];
    }

    else if (role === 'BIBLIOTHECAIRE') {
      this.items = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/bibliothecaire' },
        { label: 'Books', icon: 'pi pi-book', routerLink: '/bibliothecaire/livres' },
        { label: 'Loans', icon: 'pi pi-list', routerLink: '/bibliothecaire/emprunts' }
      ];
    }

    else {
      this.items = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/user' },
        { label: 'Books', icon: 'pi pi-book', routerLink: '/user/livres' },
        { label: 'My Loans', icon: 'pi pi-bookmark', routerLink: '/user/emprunts' }
      ];
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}