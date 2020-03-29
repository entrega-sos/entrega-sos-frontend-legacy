import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoComercianteComponent } from './selecao-comerciante.component';

describe('SelecaoComercianteComponent', () => {
  let component: SelecaoComercianteComponent;
  let fixture: ComponentFixture<SelecaoComercianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoComercianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoComercianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
