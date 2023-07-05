import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideNavComponent } from './app-side-nav.component';

describe('AppSideNavComponent', () => {
  let component: AppSideNavComponent;
  let fixture: ComponentFixture<AppSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSideNavComponent]
    });
    fixture = TestBed.createComponent(AppSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
