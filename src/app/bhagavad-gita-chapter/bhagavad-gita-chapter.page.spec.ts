import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BhagavadGitaChapterPage } from './bhagavad-gita-chapter.page';

describe('BhagavadGitaChapterPage', () => {
  let component: BhagavadGitaChapterPage;
  let fixture: ComponentFixture<BhagavadGitaChapterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BhagavadGitaChapterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
