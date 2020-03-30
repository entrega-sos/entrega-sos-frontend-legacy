import { Component, OnInit, OnDestroy } from '@angular/core';
import { tiposComercio } from '../../models/tipo-comercio.model';
import { BairrosService } from 'src/app/services/bairros.service';
import { Bairros } from '../../models/bairro.mode';
import { Subscription } from 'rxjs';
import { ComercianteService } from 'src/app/services/comerciante.service';
import { ComercianteResult } from '../../models/comerciante.model';
import { PwaService } from 'src/app/services/pwa.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public bairros: Bairros = { bairros: [] };

  private subscriptions: Subscription[] = [];

  public isHome = true;

  public data: ComercianteResult = {
    items: []
  };

  constructor(
    private bairrosService: BairrosService,
    private comercianteService: ComercianteService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.bairrosService.bairros()
        .subscribe(result => this.bairros = result, error => console.error(error))
    );

    this.isHome = this.router.routerState.snapshot.url == '/home'

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.routerState.snapshot.url == '/home'
      }
    });

    // Carrega do cache primeiro...
    this.data.items = this.comercianteService.loadFromCache() || [];

    // Depois carrega do serviço, atualizando o cache
    this.comercianteService.loadAndSave().then(data => this.data.items = data)
      .catch(error => console.error(error));
  }

  create() {
    for (var i = 0; i < 1000; i++) {
      this.comercianteService.fake(this.bairros);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  voltar() {
    window.history.back();
  }

  goToHome() {
    this.router.navigate(['/home'])
  }
}
