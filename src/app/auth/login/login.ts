import { Component, OnInit } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventType, AuthenticationResult } from '@azure/msal-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    // lo que se agrega pa la siguiente pagina
    private router: Router

  ) {}

  ngOnInit(): void {

      // Procesar manualmente si acabamos de volver del login esti fuciona
    // this.msalService.instance.handleRedirectPromise().then((result) => {
    //   if (result && result.account) {
    //     this.msalService.instance.setActiveAccount(result.account);
    //     console.log('Login procesado manualmente:', result.account);
    //   }
    // });

    // Escuchar evento de login exitoso esto funciona
    // this.msalBroadcastService.msalSubject$.subscribe((event) => {
    //   if (event.eventType === EventType.LOGIN_SUCCESS) {
    //     const result = event.payload as AuthenticationResult;
    //     this.msalService.instance.setActiveAccount(result.account);
    //     console.log('Login exitoso:', result.account);
    //   }
    // });


    // Esto sirve
    // this.msalService.instance.handleRedirectPromise().then((result) => {
    //   if (result && result.account) {
    //     this.msalService.instance.setActiveAccount(result.account);
    //     this.router.navigate(['/home']);
    //   }
    // });

    // this.msalBroadcastService.msalSubject$.subscribe((event) => {
    //   if (event.eventType === EventType.LOGIN_SUCCESS) {
    //     const result = event.payload as AuthenticationResult;
    //     this.msalService.instance.setActiveAccount(result.account);
    //     this.router.navigate(['/home']);
    //   }
    // });
    this.msalService.instance.handleRedirectPromise().then((result) => {
      if (result && result.account) {
        this.msalService.instance.setActiveAccount(result.account);
        this.obtenerToken(); // Captura el token JWT
        this.router.navigate(['/home']);
      }
    });

    this.msalBroadcastService.msalSubject$.subscribe((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const result = event.payload as AuthenticationResult;
        this.msalService.instance.setActiveAccount(result.account);
        this.obtenerToken(); // Captura el token JWT
        this.router.navigate(['/home']);
      }
    });

    // Si ya hay cuenta activa (por ejemplo, tras recargar)
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      console.log('Cuenta activa al iniciar:', accounts[0]);
    } else {
      console.log('No hay cuentas activas');
    }
  }

  login() {
    this.msalService.loginRedirect();
  }


  logout() {
  this.msalService.logoutRedirect({
    postLogoutRedirectUri: 'http://localhost:4200/'  
  });
}

  isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  getUsername(): string | null {
    const account = this.msalService.instance.getActiveAccount();
    return account ? account.username : null;
  }

  private obtenerToken(): void {
    const account = this.msalService.instance.getActiveAccount();
    if (account) {
      this.msalService.instance
        .acquireTokenSilent({
          scopes: ['openid', 'profile'], // Aquí puedes agregar más scopes si usas una API protegida
          account: account,
        })
        .then((result: AuthenticationResult) => {
          const token = result.accessToken;
          console.log('Token JWT:', token);
          localStorage.setItem('access_token', token); // Guardar el token
        })
        .catch((error) => {
          console.error('Error al obtener token:', error);
        });
    }
  }

}
