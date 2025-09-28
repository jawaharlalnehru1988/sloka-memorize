import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VakyapadaTrainingPage } from './vakyapada-training.page';

describe('VakyapadaTrainingPage', () => {
  let component: VakyapadaTrainingPage;
  let fixture: ComponentFixture<VakyapadaTrainingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VakyapadaTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
