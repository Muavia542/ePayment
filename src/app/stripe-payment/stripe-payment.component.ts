import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {
  handler: any = null;

  ngOnInit() {
    this.loadStripe();
  }

  pay(amount: number) {
    if (this.handler) {
      this.handler.open({
        name: 'Demo Site',
        description: '2 widgets',
        amount: amount * 100
      });
    } else {
      console.error('Stripe handler not initialized');
    }
  }

  private loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_xNDWmdkE05xgU0Qo2EKt3J3Y00c3UtOd9x',
          locale: 'auto',
          token: (token: any) => {
            // Send the token to your server for further processing
            this.handleToken(token);
          }
        });
      };
      script.onerror = () => {
        console.error('Failed to load Stripe script');
      };
      window.document.body.appendChild(script);
    }
  }

  private handleToken(token: any) {
    // Send the token to your server for payment processing
    console.log('Received token:', token);
    // You can show a success message to the user
    alert('Payment Success!!');
  }
}
