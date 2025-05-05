import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule,NgxSpinnerModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  password: string = '';
  confirm_password: string = '';
  success = '';
  error = '';
  constructor(
    private _api: APIService,
    private route: ActivatedRoute,
    private _alert: AlertService,
    private router:Router,
    private spinner:NgxSpinnerService
  ) {}
  ngOnInit(): void {
    // استخراج التوكن والإيميل من الرابط
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }
  onSubmit() {
    this.spinner.show();
    const data = {
      email: this.email,
      token: this.token,
      password: this.password,
      password_confirmation: this.confirm_password,
    };
    this._api.ResetPassword(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this._alert.showAlert("Password has been reset successfully",'success')
        this.success = "Password has been reset successfully";
        this.error = '';
        this.router.navigate(['/signin']);
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        this._alert.showAlert(`${err.error.message}`, 'error');
        this.error=`${err.error.message}`
        console.log(err);
        if (err.status === 400 && err.error.message ==="Invalid token") {
          this._alert.showAlert("link has expired" , 'error')
          this.error = "link has expired";
        }
        this.success='';
      },
    });
  }
}
