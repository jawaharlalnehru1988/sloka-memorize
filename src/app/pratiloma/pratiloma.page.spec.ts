import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PratilomaPage } from './pratiloma.page';

describe('PratilomaPage', () => {
  let component: PratilomaPage;
  let fixture: ComponentFixture<PratilomaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PratilomaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
