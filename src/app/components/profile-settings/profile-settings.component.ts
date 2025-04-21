import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { APIService } from '../../services/api.service';
import { Foundation } from '../../models/Foundation.model';
import { Donor } from '../../models/Donor.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
})
export class ProfileSettingsComponent implements OnInit {


  //محافظات
egyptGovernorates: string[] = [
  'Cairo',
  'Giza',
  'Alexandria',
  'Sharqia',
  'Dakahlia',
  'Beheira',
  'Monufia',
  'Qalyubia',
  'Gharbia',
  'Kafr El Sheikh',
  'Fayoum',
  'Beni Suef',
  'Minya',
  'Assiut',
  'Sohag',
  'Qena',
  'Luxor',
  'Aswan',
  'Red Sea',
  'New Valley',
  'Matrouh',
  'North Sinai',
  'South Sinai',
  'Damietta',
  'Ismailia',
  'Port Said',
  'Suez'
];


  person: Donor = {
    id: 0,
    full_name: '',
    email: '',
    phone: '',
    password: '',
    preferred_donation: '',
    location: '',
  };

  foundation: Foundation = {
    id: 0,
    foundation_name: '',
    type_of_foundation: '',
    email: '',
    phone: '',
    required_donation: '',
    location: '',
  };

  userType: string | null = null;
  userId: number | null = null;
  loading:boolean=true;

  constructor(
    private _alert: AlertService,
    private _api: APIService,
    private _Auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userType = this._Auth.getUserType();
    this.userId = this._Auth.getUserId();
    if (!this.userId || !this.userType) {
      this._alert.showAlert('حدث خطأ، يرجى تسجيل الدخول مرة أخرى!', 'error');
      this.router.navigate(['/signin']);
      return;
    }

    if (this.userType === 'foundation') {
      this._api.GetFoundationInfoByid(this.userId).subscribe({
        next: (res: any) => {
          this.foundation = res.foundation;
          console.log('Foundation info', this.foundation);
          this._Auth.updateUserName(this.foundation.foundation_name.split(' ')[0]);//بجيب اول اسم من اسم المستخدم
          this.loading=false;
        },
        error: (err) => {
          console.error('خطأ أثناء جلب بيانات المؤسسة:', err);
          this.loading=false;
        },
      });
    } else if (this.userType === 'donor') {
      this._api.GetDonorInfoByid(this.userId).subscribe({
        next: (res: any) => {
          this.person = res.donor;
          console.log('بيانات المتبرع:', this.person);
          this._Auth.updateUserName(this.person.full_name.split(' ')[0]);//بجيب اول اسم من اسم المستخدم
          this.loading=false;
        },
        error: (err) => {
          console.error('خطأ أثناء جلب بيانات المتبرع:', err);
          this.loading=false;
        },
      });
    }
  }

  //حفظ التعديل
  savechange() {
    let payload: any;

    if (this.userType === 'foundation') {
      payload = {
        user_id: this.userId, // ✅ إرسال ID بدلاً من البريد الإلكتروني
        user_type: this.userType,
        email: this.foundation.email,
        foundation_name: this.foundation.foundation_name,
        type_of_foundation: this.foundation.type_of_foundation,
        phone: this.foundation.phone,
        required_donation: this.foundation.required_donation,
        location: this.foundation.location,
      };
    } else if (this.userType === 'donor') {
      payload = {
        user_id: this.userId, // ✅ إرسال ID بدلاً من البريد الإلكتروني
        user_type: this.userType,
        email: this.person.email,
        full_name: this.person.full_name,
        phone: this.person.phone,
        preferred_donation: this.person.preferred_donation,
        location: this.person.location,
      };
    }

    this._api.updateProfile(payload).subscribe({
      next: (response) => {
        console.log('Profile updated successfully', response);
        this._alert.showAlert('Profile updated successfully!', 'success');
      },
      error: (err) => {
        console.error('خطأ أثناء تحديث الملف الشخصي:', err);
        if(err.status === 422 && err.error.errors.email){
          this._alert.showAlert(`${ err.error.errors.email}`, 'error');
        }
        if(err.status === 422 && err.error.errors.full_name){
          this._alert.showAlert('The name field must be valid', 'error');
        }
        if (err.status === 400 && err.error.message) {
          this._alert.showAlert(`${err.error.message}`, 'error');
        }
        if(err.status === 422 && err.error.errors.phone){
          this._alert.showAlert('The phone field must be valid', 'error');
        }
        if(err.status === 422 && err.error.errors.foundation_name){
          this._alert.showAlert('The foundation name field must be valid', 'error');
        }
        if(err.status === 422 && err.error.errors.required_donation){
          this._alert.showAlert('The required donation field must be valid', 'error');
        }

        if(err.status === 422 && err.error.errors.location){
          this._alert.showAlert('The location field must be valid', 'error');
        }
        if(err.status === 422 && err.error.errors.preferred_donation){
          this._alert.showAlert('The preferred donation field must be valid', 'error');
        }
      },
    });
  }



  logout() {
    this._Auth.logout();
    this.router.navigate(['/signin']);
  }
}
