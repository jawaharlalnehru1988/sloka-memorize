import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmaranaPage } from './smarana.page';

describe('SmaranaPage', () => {
  let component: SmaranaPage;
  let fixture: ComponentFixture<SmaranaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SmaranaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
