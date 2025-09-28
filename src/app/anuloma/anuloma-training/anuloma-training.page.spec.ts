import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnulomaTrainingPage } from './anuloma-training.page';

describe('AnulomaTrainingPage', () => {
  let component: AnulomaTrainingPage;
  let fixture: ComponentFixture<AnulomaTrainingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnulomaTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
