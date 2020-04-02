import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoComercioComponent } from './lista-tipo-comercio.component';

describe('ListaTipoComercioComponent', () => {
  let component: ListaTipoComercioComponent;
  let fixture: ComponentFixture<ListaTipoComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTipoComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipoComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
