import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaCanceladaComponent } from './venda-cancelada.component';

describe('VendaCanceladaComponent', () => {
  let component: VendaCanceladaComponent;
  let fixture: ComponentFixture<VendaCanceladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendaCanceladaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaCanceladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
