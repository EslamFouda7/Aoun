import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CardDetailsService } from './card-details.service';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  //الاشعار ال بيظهر فوق بعد التسجيل او التغييرات
  constructor(private _CardDetailsService: CardDetailsService) {}
  showAlert(message: string, icon: 'success' | 'error' | 'warning' ) {
    Swal.fire({
      toast: true,
      icon: icon,
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'rgba(4, 74, 82, .9)',
      color: '#ffffff',
      showClass: { popup: 'animate__animated animate__zoomIn' },
      hideClass: { popup: 'animate__animated animate__zoomOut' },
    });
  }

  //طرق الدفع
  showDonationSteps(item: any) {
    Swal.fire({
      title: 'Donate Now',
      html: `
      <p class="">Enter your donation amount:</p>
      <input type="number" id="donationAmount" class="swal2-input" placeholder="Amount in USD">
      <p>Choose your donation method:</p>
      <div class="row">
        <div class="col-md-6">
          <select id="paymentMethod" class="swal2-input selectswal">
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <div class="col-md-6 visacards">
        <img src="MasterCard_Logo.svg.png" alt="" width="60px">
        <img src="Paypal-Logo-2022.png" alt="" width="60px">
        <img src="Visa_Logo.png" alt="" width="60px">
        </div>
      </div>

    `,
      showCancelButton: true,
      confirmButtonText: 'Next',
      customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn',
      },
      background: 'rgba(4, 74, 82, .8)',
      color: '#ffffff',
      preConfirm: () => {
        const donationAmount = (
          document.getElementById('donationAmount') as HTMLInputElement
        ).value;
        const Paymenttype = (
          document.getElementById('paymentMethod') as HTMLSelectElement
        ).value;
        if (
          !donationAmount ||
          isNaN(Number(donationAmount)) ||
          Number(donationAmount) <= 0
        ) {
          Swal.showValidationMessage('Please enter a valid donation amount.');
          return false;
        }
        if (!Paymenttype) {
          Swal.showValidationMessage('Please select a payment method.');
          return false;
        }
        return { donationAmount, Paymenttype }; //  نعيد مبلغ التبرع وطريقة الدفع
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.showPaymentDetails(result.value, item);
      }
    });
  }
  showPaymentDetails(
    data: { donationAmount: string; Paymenttype: string },
    item: any
  ) {
    let htmlcontent = '';
    const { donationAmount, Paymenttype } = data; // ✅ استخراج البيانات

    if (Paymenttype === 'credit') {
      htmlcontent = `
      <div class="row">
        <div class="col-md-7 ">
          <p>Enter your credit card details:</p>
        </div>
        <div class="col-md-5 ">
          <img src="MasterCard_Logo.svg.png" alt="" width="60px">
          <img src="Visa_Logo.png" alt="" width="60px">
        </div>
      </div>
      <input type="text" id="cardNumber" class="swal2-input" placeholder="Card Number">
      <input type="text" id="cardHolder" class="swal2-input" placeholder="Card Holder Name">
      <input type="text" id="expiryDate" class="swal2-input" placeholder="Expiry Date (MM/YY)">
      <input type="password" id="cvv" class="swal2-input" placeholder="CVV">
    `;
    } else if (Paymenttype === 'paypal') {
      htmlcontent = `
      <div class="row">
        <div class="col-md-7">
        <p>Enter your PayPal email:</p>
        </div>
        <div class="col-md-5">
        <img src="Paypal-Logo-2022.png" alt="" width="70px">
        </div>
      </div>

      <input type="email" id="paypalEmail" class="swal2-input" placeholder="PayPal Email">
    `;
    }
    Swal.fire({
      title: 'Payment Details',
      showCancelButton: true,
      confirmButtonText: 'Donate',
      customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn',
      },
      background: 'rgba(4, 74, 82, .8)',
      color: '#ffffff',
      html: htmlcontent,
      preConfirm: () => {
        let Paymentdata: any = { donationAmount, Paymenttype }; //  حفظ مبلغ التبرع
        if (Paymenttype === 'credit') {
          Paymentdata = {
            ...Paymentdata,
            cardNumber: (
              document.getElementById('cardNumber') as HTMLInputElement
            ).value,
            cardHolder: (
              document.getElementById('cardHolder') as HTMLInputElement
            ).value,
            expiryDate: (
              document.getElementById('expiryDate') as HTMLInputElement
            ).value,
            cvv: (document.getElementById('cvv') as HTMLInputElement).value,
          };
        } else if (Paymenttype === 'paypal') {
          Paymentdata = {
            ...Paymentdata,
            paypalEmail: (
              document.getElementById('paypalEmail') as HTMLInputElement
            ).value,
          };
        }
        if (Object.values(Paymentdata).some((val) => !val)) {
          Swal.showValidationMessage('Please fill in all fields.');
        }
        return Paymentdata;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDonation(result.value, item);
      }
    });
  }

  //تاكيد التبرع
  confirmDonation(Paymentdata: any, item: any) {
    //دى هترجعلى ب remainingAmount من الداله updateDonationAmount الموجوده فى CardDetailsService
    const remainingAmount= this._CardDetailsService.updateDonationAmount(item.id,Number(Paymentdata.donationAmount)
    );

    //  اذا كان التبر اكبر من المبلغ المتبقي يظهر تنبيه
    // دى عشان لو جايالى فاضيه او كده
    if (remainingAmount !== null && remainingAmount !== -1) {
      Swal.fire({
        title: 'Donation Amount Exceeded!',
        text: `The remaining required amount is ${remainingAmount}$. Please enter an amount within this limit.
              We appreciate your generosity and willingness to help! 💙🙏`,
        icon: 'error',
        background: 'rgba(4, 74, 82, .9)',
        color: '#ffffff',
        customClass: {
          confirmButton: 'custom-confirm-btn',
        },
      });
      return;
    }
    //  التبرع ناجح
    Swal.fire({
      title: 'Donation Confirmed!',
      text: `You have donated ${Paymentdata.donationAmount}$ using ${Paymentdata.Paymenttype}. Thank you for your generosity! 💙🙏`,
      icon: 'success',
      background: 'rgba(4, 74, 82, .9)',
      color: '#ffffff',
      customClass: {
        confirmButton: 'custom-confirm-btn',
      },
    });
  }




}
