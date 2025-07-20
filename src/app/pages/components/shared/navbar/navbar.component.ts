import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private msalService: MsalService) {}

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }

  getUsername(): string {
    const account: AccountInfo | null = this.msalService.instance.getActiveAccount();
    return account?.username || '';
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }
}
