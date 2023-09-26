import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentService } from './payment.service';

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

  // Price per appointment
  private pricePerAppointment = 40; // Replace with your actual price

  // Payments for each partner
  private primaryPayment!: number;
  private doctorPayment!: number;
  private hospitalPayment!: number;

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

  constructor(private PaymentService: PaymentService) {}

  ngOnInit(): void {
    // Calculate payments for each partner based on percentages and price per appointment
    this.primaryPayment = this.pricePerAppointment * this.primaryPercentage;
    this.doctorPayment = this.pricePerAppointment * this.doctorPercentage;
    this.hospitalPayment = this.pricePerAppointment * this.hospitalPercentage;

    // Initialize the total price based on the price for the primary partner
    this.paymentRequest.transactionInfo.totalPrice = this.primaryPayment.toFixed(2);
  }

  async onLoadPaymentData(event: Event) {
    const paymentData = (event as CustomEvent<google.payments.api.PaymentData>).detail;
    
    // Process payment data
    const paymentResult = await PaymentService.processPayment(paymentData);
  
    if (paymentResult.success) {
      // Payment was successful, distribute funds to partners
      const primarySuccess = await PaymentService.transferFundsToPrimary(this.primaryPayment);
      const doctorSuccess = await PaymentService.transferFundsToDoctor(this.doctorPayment);
      const hospitalSuccess = await PaymentService.transferFundsToHospital(this.hospitalPayment);
  
      if (primarySuccess && doctorSuccess && hospitalSuccess) {
        // All transfers were successful
        // You can update the totalPrice or navigate to a confirmation page here
      } else {
        // Handle errors in fund transfers
      }
    } else {
      // Handle payment processing errors
    }
  }
}
