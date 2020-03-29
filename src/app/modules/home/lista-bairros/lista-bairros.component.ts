import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bairros } from '../../models/bairro.mode';
import { Subscription } from 'rxjs';
import { BairrosService } from 'src/app/services/bairros.service';

@Component({
  selector: 'app-lista-bairros',
  templateUrl: './lista-bairros.component.html',
  styleUrls: ['./lista-bairros.component.scss']
})
export class ListaBairrosComponent implements OnInit, OnDestroy {

  public bairros: Bairros = { bairros: [] };

  private subscriptions: Subscription[] = [];

  constructor(private bairrosService: BairrosService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.bairrosService.bairros()
        .subscribe(result => this.bairros = result, error => console.error(error))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
