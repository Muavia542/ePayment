import { Component } from '@angular/core';

// Declare the ApplePaySession as a global variable
declare global {
  interface Window {
    ApplePaySession: any;
  }
}

@Component({
  selector: 'app-apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.css']
})
export class ApplePayComponent {

  constructor() {}

  onApplePayButtonClick() {
    // Check if Apple Pay is available
    if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
      // Initialize the Apple Pay session and handle payment logic here
      const paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        merchantCapabilities: ['supports3DS'],
        supportedNetworks: ['visa', 'masterCard'],
        total: {
          label: 'Your Product',
          amount: '10.00'
        }
      };

      const session = new window.ApplePaySession(1, paymentRequest); // Use window.ApplePaySession
      session.onvalidatemerchant = (event:any) => {
        const validationURL = event.validationURL;
        // Send the URL to your server for validation
        // Your server should return a merchant session promise
        // Example: fetch('/validate-merchant', { method: 'POST', body: JSON.stringify({ validationURL }) });
      };
      session.onpaymentauthorized = (event:any) => {
        const paymentToken = event.payment.token;
        // Send the payment token to your server for processing
        // Example: fetch('/process-payment', { method: 'POST', body: JSON.stringify({ paymentToken }) });
        session.completePayment(window.ApplePaySession.STATUS_SUCCESS); // Use window.ApplePaySession
      };
      session.oncancel = (event:any) => {
        alert('Payment was canceled.');
      };
      session.begin();
    } else {
      alert('Apple Pay is not available on this device.');
    }
  }
}
