import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IshopanishadPage } from './ishopanishad.page';

describe('IshopanishadPage', () => {
  let component: IshopanishadPage;
  let fixture: ComponentFixture<IshopanishadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IshopanishadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
