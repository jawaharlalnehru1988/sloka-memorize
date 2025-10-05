import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PratilomaTrainingComponent } from './pratiloma-training.component';

describe('PratilomaTrainingComponent', () => {
  let component: PratilomaTrainingComponent;
  let fixture: ComponentFixture<PratilomaTrainingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PratilomaTrainingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PratilomaTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
