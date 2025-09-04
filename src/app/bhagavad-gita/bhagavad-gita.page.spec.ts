import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BhagavadGitaPage } from './bhagavad-gita.page';

describe('BhagavadGitaPage', () => {
  let component: BhagavadGitaPage;
  let fixture: ComponentFixture<BhagavadGitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BhagavadGitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
