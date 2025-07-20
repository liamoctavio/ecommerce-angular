import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class VentaService {
  private baseUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  crearVenta(venta: any) {
    return this.http.post(`${this.baseUrl}/enviar`, venta);
  }

  // getVentas() {
  //   return this.http.get<any[]>(`${this.baseUrl}/listar`);
  // }
}
