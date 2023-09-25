import { Component, OnInit } from '@angular/core';
import { SplitPaymentService } from './split-payment.service';
import { Observable } from 'rxjs';
import { Recipient } from './recipient.interface';

@Component({
  selector: 'app-split-google-pay',
  templateUrl: './split-google-pay.component.html',
  styleUrls: ['./split-google-pay.component.css']
})
export class SplitGooglePayComponent implements OnInit {
  totalAmount = 100; // Total payment amount
  recipients: Recipient[] = [
    { id: 1, percentage: 50 }, // Recipient 1 gets 50%
    { id: 2, percentage: 30 }, // Recipient 2 gets 30%
    { id: 3, percentage: 20 }  // Recipient 3 gets 20%
  ];
  splitAmounts: number[] = [];
  paymentResponse$: Observable<string> | null = null; // Observable to capture the response

  constructor(private splitPaymentService: SplitPaymentService) {}

  splitPayment() {
    const gateway = 'test-gateway'; // Replace with your actual payment gateway
    const simulateSuccess = false; // Set to true to simulate success for testing

    this.paymentResponse$ = this.splitPaymentService.splitPayment(
      this.totalAmount,
      this.recipients,
      gateway,
      simulateSuccess
    );

    // Subscribe to the observable to handle the response
    this.paymentResponse$.subscribe(
      (response: string) => {
        // Handle successful payment response
        console.log(response);
        this.splitAmounts = this.recipients.map((recipient, index) => {
          return (recipient.percentage / 100) * this.totalAmount;
        });
      },
      (error) => {
        // Handle payment failure here
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
    console.log("The component is loading");
  }
}
