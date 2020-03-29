import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComerciantesPorBairroComponent } from './lista-comerciantes-por-bairro.component';

describe('ListaComerciantesPorBairroComponent', () => {
  let component: ListaComerciantesPorBairroComponent;
  let fixture: ComponentFixture<ListaComerciantesPorBairroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaComerciantesPorBairroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComerciantesPorBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
