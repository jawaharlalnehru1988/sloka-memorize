import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UchcharanaPage } from './uchcharana.page';

describe('UchcharanaPage', () => {
  let component: UchcharanaPage;
  let fixture: ComponentFixture<UchcharanaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UchcharanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
