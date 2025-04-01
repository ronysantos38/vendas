import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaFilialComponent } from './venda-filial.component';

describe('VendaFilialComponent', () => {
  let component: VendaFilialComponent;
  let fixture: ComponentFixture<VendaFilialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendaFilialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
