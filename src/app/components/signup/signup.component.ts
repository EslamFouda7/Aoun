import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { APIService } from '../../services/api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  isDonor: boolean = true;
  donorData = {
    full_name: '',
    email: '',
    phone: '',
    password: '',
    preferred_donation: '',
    location: '',
  };
  foundationData = {
    foundation_name: '',
    type_of_foundation: '',
    email: '',
    phone: '',
    password: '',
    required_donation: '',
    location: '',
  };
  conPasswordDonor: string = '';
  conPasswordFoundation: string = '';
  constructor(private _api: APIService,
              private _alert: AlertService,
              private router:Router) {}

  switchToDonor() {
    this.isDonor = true;
  }

  switchToFoundation() {
    this.isDonor = false;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this._alert.showAlert('Please fill all required fields!', 'warning');
      return;
    }
    // التحقق من تطابق كلمة المرور
    if (this.isDonor && this.donorData.password !== this.conPasswordDonor) {
      this._alert.showAlert('Passwords do not match!', 'error');
      return;
    }
    if (!this.isDonor && this.foundationData.password !== this.conPasswordFoundation) {
      this._alert.showAlert('Passwords do not match!', 'error');
      return;
    }

    if (this.isDonor) {
      localStorage.setItem('userRole', 'donor');
      this._api.DonorRegister(this.donorData).subscribe({
        next: (res) => {
          this._alert.showAlert('Account created successfully!', 'success');
          console.log('Donor Form Submitted:', res);
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          console.log('Donor Form failed:', err);

          if (err.status === 422 && err.error.errors) {
            if (err.error.errors.email) {
              this._alert.showAlert(`${err.error.errors.email[0]}`, 'error');
            }
            if (err.error.errors.password) {
              this._alert.showAlert(`${err.error.errors.password[0]}`, 'error');
            }

          }
          else if (err.error.message){
              this._alert.showAlert('This email is already in use. Please try using a different email!', 'error');
            } else {
            this._alert.showAlert('Account creation failed. Please try again.', 'error');
          }
        },
      });
    } else {
      localStorage.setItem('userRole', 'foundation');
      this._api.FoundationRegister(this.foundationData).subscribe({
        next: (res) => {
          this._alert.showAlert('Account created successfully!', 'success');
          console.log('Foundation Form Submitted:', res);
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          console.log('Foundation Form failed:', err);

          if (err.status === 422 && err.error.errors) {
            if (err.error.errors.email) {
              this._alert.showAlert(`${err.error.errors.email[0]}`, 'error');
            }
            if (err.error.errors.password) {
              this._alert.showAlert(`${err.error.errors.password[0]}`, 'error');
            }
          }
          else if (err.error.message){
            this._alert.showAlert('This email is already in use. Please try using a different email!', 'error');
          }
          else {
            this._alert.showAlert('Account creation failed. Please try again.', 'error');
          }
        },
      });
    }
  }

}
