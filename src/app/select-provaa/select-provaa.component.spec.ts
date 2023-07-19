import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProvaaComponent } from './select-provaa.component';

describe('SelectProvaaComponent', () => {
  let component: SelectProvaaComponent;
  let fixture: ComponentFixture<SelectProvaaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectProvaaComponent]
    });
    fixture = TestBed.createComponent(SelectProvaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
