import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBairrosComponent } from './lista-bairros.component';

describe('ListaBairrosComponent', () => {
  let component: ListaBairrosComponent;
  let fixture: ComponentFixture<ListaBairrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaBairrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBairrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
