import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComerciantesComponent } from './lista-comerciantes.component';

describe('ListaComerciantesComponent', () => {
  let component: ListaComerciantesComponent;
  let fixture: ComponentFixture<ListaComerciantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaComerciantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComerciantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
