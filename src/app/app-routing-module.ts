import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { Home } from './pages/components/shared/home/home';
import { Login } from './pages/components/login/login';
import { VentaComponent } from './pages/components/venta/venta.component';
import { VentaCrearComponent } from './pages/components/venta/venta-crear/venta-crear.component';
import { PromocionComponent } from './pages/components/promocion/promocion.component';
import { PromocionCrearComponent } from './pages/components/promocion/promocion-crear/promocion-crear.component';


const routes: Routes = [
   { path: 'home', component: Home },
  { path: '', component: Login },
  { path: 'auth', component: Login },
  { path: 'redirect', component: MsalRedirectComponent }, // <- esta es la ruta clave
  { path: 'ventas', component: VentaComponent },
  { path: 'ventas/crear', component: VentaCrearComponent },
  { path: 'promociones', component: PromocionComponent },
  { path: 'promociones/crear', component: PromocionCrearComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
