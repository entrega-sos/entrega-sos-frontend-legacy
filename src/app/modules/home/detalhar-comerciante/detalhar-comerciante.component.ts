import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Comerciante} from '../../models/comerciante.model';
import {ActivatedRoute} from '@angular/router';
import {ComercianteService} from 'src/app/services/comerciante.service';

@Component({
  selector: 'app-detalhar-comerciante',
  templateUrl: './detalhar-comerciante.component.html',
  styleUrls: ['./detalhar-comerciante.component.scss']
})
export class DetalharComercianteComponent implements OnInit {

  subscriptions: Subscription[] = [];
  comerciante: Partial<Comerciante> = {};
  idComerciante: string = '';

  constructor(
    private route: ActivatedRoute,
    private comercianteService: ComercianteService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(data => {
      this.idComerciante = data['comerciante'];

      this.comerciante = this.comercianteService.loadFromCache().find(c => c.id === this.idComerciante);

      if (this.comerciante) {
        this.subscriptions.push(
          this.comercianteService.get(this.comerciante.usuario)
            .subscribe(c => this.comerciante = c, (error) => console.error(error))
        );
      }
    }));
  }

  voltar() {
    window.history.back();
  }
}
