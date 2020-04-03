import { Component, OnInit, OnDestroy } from '@angular/core';
import { BairrosService } from 'src/app/services/bairros.service';
import { Bairros } from '../../models/bairro.model';
import { Subscription } from 'rxjs';
import { ComercianteService } from 'src/app/services/comerciante.service';
import { ComercianteResult } from '../../models/comerciante.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public bairros: Bairros = { bairros: [] };

  private subscriptions: Subscription[] = [];

  public isHome = true;

  public versao = '';

  public data: Partial<ComercianteResult> = {
    items: []
  };

  constructor(
    private comercianteService: ComercianteService,
    private router: Router) { }

  ngOnInit(): void {

    this.versao = environment.versao;

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
