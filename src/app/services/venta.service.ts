import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class VentaService {
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  crearVenta(venta: any) {
    return this.http.post(this.baseUrl, venta);
  }

  getVentas() {
    return this.http.get<any[]>(this.baseUrl);
  }
}

