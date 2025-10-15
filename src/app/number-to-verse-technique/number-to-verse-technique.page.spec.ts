import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberToVerseTechniquePage } from './number-to-verse-technique.page';

describe('NumberToVerseTechniquePage', () => {
  let component: NumberToVerseTechniquePage;
  let fixture: ComponentFixture<NumberToVerseTechniquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberToVerseTechniquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
