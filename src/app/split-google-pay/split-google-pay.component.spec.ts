import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitGooglePayComponent } from './split-google-pay.component';

describe('SplitGooglePayComponent', () => {
  let component: SplitGooglePayComponent;
  let fixture: ComponentFixture<SplitGooglePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitGooglePayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitGooglePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
