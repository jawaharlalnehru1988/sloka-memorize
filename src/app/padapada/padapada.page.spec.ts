import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PadapadaPage } from './padapada.page';

describe('PadapadaPage', () => {
  let component: PadapadaPage;
  let fixture: ComponentFixture<PadapadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PadapadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
