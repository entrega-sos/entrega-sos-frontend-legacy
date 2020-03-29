import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharComercianteComponent } from './detalhar-comerciante.component';

describe('DetalharComercianteComponent', () => {
  let component: DetalharComercianteComponent;
  let fixture: ComponentFixture<DetalharComercianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalharComercianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharComercianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
