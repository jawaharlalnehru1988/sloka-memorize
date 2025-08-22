import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VakyapadaPage } from './vakyapada.page';

describe('VakyapadaPage', () => {
  let component: VakyapadaPage;
  let fixture: ComponentFixture<VakyapadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VakyapadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
