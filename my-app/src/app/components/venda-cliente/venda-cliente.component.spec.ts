import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaClienteComponent } from './venda-cliente.component';

describe('VendaClienteComponent', () => {
  let component: VendaClienteComponent;
  let fixture: ComponentFixture<VendaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
