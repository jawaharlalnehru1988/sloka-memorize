import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KramapadaPage } from './kramapada.page';

describe('KramapadaPage', () => {
  let component: KramapadaPage;
  let fixture: ComponentFixture<KramapadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KramapadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
