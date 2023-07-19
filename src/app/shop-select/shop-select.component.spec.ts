import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSelectComponent } from './shop-select.component';

describe('ShopSelectComponent', () => {
  let component: ShopSelectComponent;
  let fixture: ComponentFixture<ShopSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopSelectComponent]
    });
    fixture = TestBed.createComponent(ShopSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
