import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromocionService } from '../../../../services/promocion.service';


@Component({
  selector: 'app-promocion-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promocion-crear.component.html',
})
export class PromocionCrearComponent {
  promocion = {
    descripcion: '',
    fechaInicio: '',
    fechaFin: ''
  };

  constructor(private promocionService: PromocionService) {}

  crearPromocion() {
    this.promocionService.crearPromocion(this.promocion).subscribe({
      next: () => alert('Promoción enviada correctamente a RabbitMQ'),
      error: () => alert('Error al enviar la promoción'),
    });
  }
}
