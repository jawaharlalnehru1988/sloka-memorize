import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlokaRendererComponent } from './sloka-renderer.component';

describe('SlokaRendererComponent', () => {
  let component: SlokaRendererComponent;
  let fixture: ComponentFixture<SlokaRendererComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SlokaRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlokaRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
