import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AratiSongsPage } from './arati-songs.page';

describe('AratiSongsPage', () => {
  let component: AratiSongsPage;
  let fixture: ComponentFixture<AratiSongsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AratiSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
