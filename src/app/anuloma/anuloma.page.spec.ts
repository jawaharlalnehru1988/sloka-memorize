import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnulomaPage } from './anuloma.page';

describe('AnulomaPage', () => {
  let component: AnulomaPage;
  let fixture: ComponentFixture<AnulomaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnulomaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
