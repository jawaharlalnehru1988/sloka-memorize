import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AratiSongDetailPage } from './arati-song-detail.page';

describe('AratiSongDetailPage', () => {
  let component: AratiSongDetailPage;
  let fixture: ComponentFixture<AratiSongDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AratiSongDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
