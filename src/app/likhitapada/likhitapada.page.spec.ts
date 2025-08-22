import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikhitapadaPage } from './likhitapada.page';

describe('LikhitapadaPage', () => {
  let component: LikhitapadaPage;
  let fixture: ComponentFixture<LikhitapadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LikhitapadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
