import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-donation-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './donation-modal.component.html',
  styleUrl: './donation-modal.component.css',
})
export class DonationModalComponent {
  constructor(
    private _api: APIService,
    private _Auth: AuthService,
    private _alert: AlertService
  ) {}

  @Input() item: any;
  @Output() close = new EventEmitter<void>();

  donationAmount: number = 0;
  paymentMethod: string = 'credit';
  cardNumber: string = '';
  cardHolder: string = '';
  expiryDate: string = '';
  cvv: string = '';
  paypalEmail: string = '';
  step: number = 1; // المتغير الذي يتحكم في المراحل

  handleAction() {
    if (this.step === 1) {
      if (!this.donationAmount || Number(this.donationAmount) < 5) {
        this._alert.showAlert(
          'The minimum donation amount is $5. Please enter a valid amount.',
          'error'
        );
        return;
      }
       //تحقق من أن المبلغ لا يتجاوز المتبقي
    const remaining = this.item?.stats?.remaining_amount;
    if (this.donationAmount > remaining) {
      this._alert.showAlert(
        `The remaining amount for this donation is only $${remaining}. Please enter a valid amount.`,
        'error'
      );
      return;
    }
      if (!this.paymentMethod) {
        this._alert.showAlert('Please select a payment method.', 'error');
        return;
      }

      this.step = 2;
    } else {
      this.confirmDonation();
    }
  }
  confirmDonation() {
    if (this.paymentMethod === 'credit') {
      if (
        !this.cardNumber ||
        !this.cardHolder ||
        !this.expiryDate ||
        !this.cvv
      ) {
        this._alert.showAlert('Please fill in all credit card fields.','error')
        return;
      }
    }
    if (this.paymentMethod === 'paypal' && !this.paypalEmail) {
      this._alert.showAlert('Please enter your PayPal email.','error')
      return;
    }
    // بيانات التبرع
    //بعرض الداتا بتاعه الكارت بس عن طريق idبتاع الخدمه
    const itemId = this.item?.id;
    const userId = this._Auth.getUserId();
    const payload = {
      donation_request_id: itemId, // من العنصر اللي تم تمريره للمودال
      donor_id: userId, // مؤقتاً ثابت - استبدله من localStorage أو auth system عندك
      amount: this.donationAmount,
      payment_method:
        this.paymentMethod === 'credit' ? 'credit_card' : 'paypal',
      currency: 'USD',
      notes: '',
    };

    // إرسال البيانات
    this._api.StoreDonations(payload).subscribe({
      next: (res) => {
        console.log(res);
        this._alert.showAlert(
          `You have donated ${this.donationAmount}$. Thank you for your generosity! 💙🙏`,
          'success'
        );
        this.closeModal();
      },
      error: (err) => {
        console.error('Server error:', err);
        if(err.error.errors.donor_id){
          this._alert.showAlert('Donation failed! this is foundation acount', 'error');
        }

      },
    });
  }
  closeModal() {
    this.resetForm();
    this.close.emit(); // إشعار للأب إنه يقفل المودال
  }

  resetForm() {
    this.donationAmount = 0;
    this.paymentMethod = '';
    this.cardNumber = '';
    this.cardHolder = '';
    this.expiryDate = '';
    this.cvv = '';
    this.paypalEmail = '';
  }

}

