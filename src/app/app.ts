import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  constructor(private msalService: MsalService) {
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.msalService.instance.setActiveAccount(accounts[0]);
      }
    }

  protected title = 'ecommerce-front-b';
}
