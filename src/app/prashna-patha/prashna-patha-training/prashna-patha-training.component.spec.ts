import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrashnaPathaTrainingComponent } from './prashna-patha-training.component';

describe('PrashnaPathaTrainingComponent', () => {
  let component: PrashnaPathaTrainingComponent;
  let fixture: ComponentFixture<PrashnaPathaTrainingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrashnaPathaTrainingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrashnaPathaTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
