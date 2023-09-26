import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-split-google-pay',
  templateUrl: './split-google-pay.component.html',
  styleUrls: ['./split-google-pay.component.css']
})
export class SplitGooglePayComponent implements OnInit {
  // Define the percentages for each partner
  private primaryPercentage = 0.4; // 40%
  private doctorPercentage = 0.3; // 30%
  private hospitalPercentage = 0.3; // 30%

  // Total appointments and appointments for each partner
  private totalAppointments = 0;
  private primaryAppointments = 0;
  private doctorAppointments = 0;
  private hospitalAppointments = 0;

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
    // Calculate the number of appointments for each partner based on percentages
    this.totalAppointments = this.totalAppointments;
    this.primaryAppointments = Math.floor(this.totalAppointments * this.primaryPercentage);
    this.doctorAppointments = Math.floor(this.totalAppointments * this.doctorPercentage);
    this.hospitalAppointments = Math.floor(this.totalAppointments * this.hospitalPercentage);

    // Calculate the total price based on the number of appointments (you need to define a price per appointment)
    const pricePerAppointment = 40;
    this.paymentRequest.transactionInfo.totalPrice = (this.totalAppointments * pricePerAppointment).toFixed(2);
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
