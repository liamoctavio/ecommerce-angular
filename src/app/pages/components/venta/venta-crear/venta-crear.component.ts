import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VentaService } from "../../../../services/venta.service";


@Component({
  selector: 'app-venta-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './venta-crear.component.html',
})
export class VentaCrearComponent {
  venta = { producto: '', cantidad: 0, total: 0 };

  constructor(private ventaService: VentaService) {}

  registrarVenta() {
    this.ventaService.crearVenta(this.venta).subscribe({
      next: () => alert('Venta registrada y enviada a RabbitMQ'),
      error: () => alert('Error al registrar venta'),
    });
  }
}
