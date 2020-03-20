import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToogleComponent } from './toogle.component';

describe('ToogleComponent', () => {
  let component: ToogleComponent;
  let fixture: ComponentFixture<ToogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
