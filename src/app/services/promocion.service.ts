import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PromocionService {
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  getPromociones() {
    return this.http.get<any>(this.baseUrl);
  }

  crearPromocion(promocion: any) {
    return this.http.post(this.baseUrl, promocion);
  }
}
