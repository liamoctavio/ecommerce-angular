import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PromocionService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  crearPromocion(promocion: any) {
    return this.http.post(`${this.baseUrl}/api/promociones/enviar`, promocion);
  }

  getPromocionesActivas() {
    return this.http.get<any[]>(`${this.baseUrl}/promociones/activas`);
  }
}
