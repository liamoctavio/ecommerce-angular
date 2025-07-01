import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  username: string | null = null;
  backendMessage: string | null = null;


  constructor(
    private msalService: MsalService,
    private http: HttpClient) {}

  ngOnInit(): void {
    const account = this.msalService.instance.getActiveAccount();
    this.username = account ? account.username : null;

     // Llamada al backend
    this.http.get('http://54.167.8.207:8080/api/test', { responseType: 'text' })
      .subscribe({
        next: (res) => {
          console.log('Respuesta backend:', res);
          this.backendMessage = res;
        },
        error: (err) => {
          console.error('Error al llamar al backend:', err);
          this.backendMessage = 'Error al conectar con el backend';
        }
      });

  }

  logout() {
  this.msalService.logoutRedirect({
    postLogoutRedirectUri: 'http://localhost:4200/'  // o la ruta que desees
  });
}

}
