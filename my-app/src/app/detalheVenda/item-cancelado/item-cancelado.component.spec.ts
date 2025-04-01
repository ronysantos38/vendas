import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCanceladoComponent } from './item-cancelado.component';

describe('ItemCanceladoComponent', () => {
  let component: ItemCanceladoComponent;
  let fixture: ComponentFixture<ItemCanceladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCanceladoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCanceladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
