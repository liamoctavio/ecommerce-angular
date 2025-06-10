import { Injectable } from '@angular/core';
import { PublicClientApplication } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class MsalInit {

  constructor(private instance: PublicClientApplication) {}

  initialize(): Promise<void> {
    return this.instance.initialize();
  }
}
