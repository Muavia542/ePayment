import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; // Import 'of' from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators';
import { Recipient } from './recipient.interface';

@Injectable({
  providedIn: 'root'
})
export class SplitPaymentService {
  constructor(private http: HttpClient) {}

  splitPayment(
    amount: number,
    recipients: Recipient[],
    gateway: string,
    simulateSuccess: boolean = false
  ): Observable<string> {
    // Calculate the split amounts for each recipient
    const splitAmounts = recipients.map(recipient => amount * recipient.percentage);

    // Create payment transactions for each recipient
    const paymentTransactions = recipients.map((recipient, index) => ({
      recipientId: recipient.id,
      amount: splitAmounts[index],
    }));

    // Simulate a successful or failed payment for testing
    if (simulateSuccess) {
      return of('Payment successful (for testing)'); // Return a success message
    } else {
      return this.http.post(`/api/split-payment/${gateway}`, { paymentTransactions }).pipe(
        switchMap((response: any) => {
          if (response.success) {
            return of('Payment successful'); // Return a success message
          } else {
            return throwError(new SplitPaymentError('Failed to split payment', 'PAYMENT_FAILURE'));
          }
        }),
        catchError((error: any) => {
          if (error.status === 400) {
            return throwError(new SplitPaymentError('Invalid request', 'INVALID_REQUEST'));
          } else if (error.status === 403) {
            return throwError(new SplitPaymentError('Permission denied', 'PERMISSION_DENIED'));
          } else if (error.status === 500) {
            return throwError(new SplitPaymentError('Internal server error', 'SERVER_ERROR'));
          } else {
            return throwError(new SplitPaymentError('Unknown error', 'UNKNOWN_ERROR'));
          }
        })
      );
    }
  }
}

class SplitPaymentError extends Error {
  constructor(message: string, public errorCode: string) {
    super(message);
    this.name = 'SplitPaymentError';
  }
}
