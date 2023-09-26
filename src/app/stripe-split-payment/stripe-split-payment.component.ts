import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-stripe-split-payment',
  templateUrl: './stripe-split-payment.component.html',
  styleUrls: ['./stripe-split-payment.component.css']
})
export class StripeSplitPaymentComponent implements OnInit {
  stripe: any = null;

  ngOnInit() {
    this.loadStripe();
  }

  async pay(amount: number) {
    if (this.stripe) {
      const { token, error } = await this.stripe.createToken({
        name: 'Demo Site',
      });

      if (error) {
        console.error(error);
      } else {
        // You have the token, send it to your server
        this.handleToken(token, amount);
      }
    } else {
      console.error('Stripe not initialized');
    }
  }

  private async loadStripe() {
    if (!this.stripe) {
      const stripe = await loadStripe('pk_test_xNDWmdkE05xgU0Qo2EKt3J3Y00c3UtOd9x');
      this.stripe = stripe;
    }
  }

  private handleToken(token: any, amount: number) {
    // Send the token and amount to your server for payment processing
    console.log('Received token:', token);

    // You can now create a charge on your server, split it, and handle the payment flow accordingly

    // Example server-side code (Node.js):
    /*
    const stripe = require('stripe')('sk_test_gGtMzfdjwC3KoXDyvVVnhZpl00snvRFfW2');
    stripe.charges.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      source: token.id,
      application_fee_amount: 100, // Platform fee in cents (adjust as needed)
      // Add more parameters for split payments
    }, {
      stripeAccount: 'SELLER_STRIPE_ACCOUNT_ID', // Seller's Stripe account ID
    }).then((charge) => {
      // Handle the charge and payment flow here
      console.log('Payment Success:', charge);
      alert('Payment Success!!');
    }).catch((error) => {
      console.error('Payment Error:', error);
      alert('Payment Error');
    });
    */
  }
}