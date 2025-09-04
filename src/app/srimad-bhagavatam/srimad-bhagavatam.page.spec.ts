import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SrimadBhagavatamPage } from './srimad-bhagavatam.page';

describe('SrimadBhagavatamPage', () => {
  let component: SrimadBhagavatamPage;
  let fixture: ComponentFixture<SrimadBhagavatamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SrimadBhagavatamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
