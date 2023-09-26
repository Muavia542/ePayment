import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeSplitPaymentComponent } from './stripe-split-payment.component';

describe('StripeSplitPaymentComponent', () => {
  let component: StripeSplitPaymentComponent;
  let fixture: ComponentFixture<StripeSplitPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeSplitPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripeSplitPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
