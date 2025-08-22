import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JatapadaPage } from './jatapada.page';

describe('JatapadaPage', () => {
  let component: JatapadaPage;
  let fixture: ComponentFixture<JatapadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JatapadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
