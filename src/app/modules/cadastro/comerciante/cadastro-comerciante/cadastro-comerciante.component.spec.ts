import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComercianteComponent } from './cadastro-comerciante.component';

describe('CadastroComercianteComponent', () => {
  let component: CadastroComercianteComponent;
  let fixture: ComponentFixture<CadastroComercianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroComercianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComercianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
