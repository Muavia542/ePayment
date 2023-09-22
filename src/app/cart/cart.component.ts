import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '17613812255336763067',
      merchantName: 'Demo Only (you will not be charged)'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '0.00', // Set an initial value, it will be updated later
      currencyCode: 'USD',
      countryCode: 'US'
    }
  };

  constructor() {}

  ngOnInit(): void {
    // You can update totalPrice here when you have the actual cart data.
    // this.paymentRequest.transactionInfo.totalPrice = this.cartTotal.toFixed(2);
  }

  async onLoadPaymentData(event: Event) {
    const paymentData = (event as CustomEvent<google.payments.api.PaymentData>).detail;
    // Handle payment data here.
    // You can also update the totalPrice in this method if needed.

    // Example: this.paymentRequest.transactionInfo.totalPrice = updatedTotal.toFixed(2);

    // After handling payment data, you can navigate or perform further actions.
    // this.router.navigate(['/confirm']);
  }
}
