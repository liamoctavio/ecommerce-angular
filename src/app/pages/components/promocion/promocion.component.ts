import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromocionService } from '../../../services/promocion.service';


@Component({
  selector: 'app-promocion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promocion.component.html',
})
export class PromocionComponent implements OnInit {
  promociones: any[] = [];
  jsonUrl: string = '';

  constructor(private promocionService: PromocionService) {}

  ngOnInit(): void {
    this.promocionService.getPromocionesActivas().subscribe({
      next: (data: any) => {
        this.promociones = data.promociones ?? data;
        this.jsonUrl = data.jsonUrl ?? ''; // si el backend entrega una URL
      },
      error: () => alert('Error al obtener promociones'),
    });
  }

  descargarJson() {
    if (this.jsonUrl) {
      window.open(this.jsonUrl, '_blank');
    } else {
      alert('Archivo JSON no disponible');
    }
  }
}
