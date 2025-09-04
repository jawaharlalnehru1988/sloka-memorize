import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrahmaSamhitaPage } from './brahma-samhita.page';

describe('BrahmaSamhitaPage', () => {
  let component: BrahmaSamhitaPage;
  let fixture: ComponentFixture<BrahmaSamhitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BrahmaSamhitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
