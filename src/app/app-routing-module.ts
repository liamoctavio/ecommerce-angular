import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { Home } from './pages/home/home'; // importa tu componente


const routes: Routes = [
   { path: 'home', component: Home },
    { path: '', component: Login },
    { path: 'auth', component: Login },
  { path: 'redirect', component: MsalRedirectComponent }, // <- esta es la ruta clave
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
