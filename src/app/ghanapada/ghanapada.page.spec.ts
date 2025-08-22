import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GhanapadaPage } from './ghanapada.page';

describe('GhanapadaPage', () => {
  let component: GhanapadaPage;
  let fixture: ComponentFixture<GhanapadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GhanapadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
