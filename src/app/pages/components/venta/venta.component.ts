import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { VentaService } from "../../../services/venta.service";


@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venta.component.html',
})
export class VentaComponent implements OnInit {
  ventas: any[] = [];

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.getVentas().subscribe({
      next: (data: any) => (this.ventas = data),
      error: () => alert('Error al cargar ventas'),
    });
  }
}
