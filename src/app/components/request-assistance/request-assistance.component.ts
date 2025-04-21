import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { APIService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth-service.service';
import { Foundation } from '../../models/Foundation.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-assistance',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './request-assistance.component.html',
  styleUrl: './request-assistance.component.css',
})
export class RequestAssistanceComponent {
  loading: boolean = true;

  constructor(
    private _Auth: AuthService,
    private _api: APIService,
    private _alert: AlertService
  ) {}
  request: any = {
    foundation_name: '',
    location: '',
    reqiured_donation:'',
    title: '',
    description: '',
    required_amount: '',
    file: '',
  };
  userId: number | null = null;

  ngOnInit(): void {
    //عرض بيانات المؤسسه
    this.userId = this._Auth.getUserId();
    if (this.userId !== null) {
      this._api.GetFoundationInfoByid(this.userId).subscribe({
        next: (res: { foundation: Foundation }) => {
          console.log(res);
          this.request.foundation_name = res.foundation.foundation_name;
          this.request.location = res.foundation.location;
          this.loading = false;
        },
        error: (err) => {
          console.log('erorr', err);
          this.loading = false;
        },
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.request.file = file;
    }
  }

  onSubmit(form: any) {
    const formData = new FormData();
    formData.append('foundation_name', this.request.foundation_name);
    formData.append('location', this.request.location);
    formData.append('reqiured_donation', this.request.reqiured_donation);
    formData.append('title', this.request.title);
    formData.append('description', this.request.description);
    formData.append('required_amount', this.request.required_amount);
    console.log(this.request.required_donation)
    if (this.request.file) {
      formData.append('file', this.request.file);
    }
    this._api.DonationRequests(formData).subscribe({
      next: (res) => {
        console.log('res', res);
        this._alert.showAlert('Request Assistance Successfly!', 'success');
        this.request = '';
      },
      error: (err) => {
        console.log('err', err);
        if (err.status === 422) {
          if (err.error.errors.required_amount) {
            this._alert.showAlert(
              `${err.error.errors.required_amount}`,
              'warning'
            );
          }

          if (err.error.errors.file) {
            this._alert.showAlert(`${err.error.errors.file}`, 'warning');
          }
          if (err.error.errors.description) {
            this._alert.showAlert(`${err.error.errors.description}`, 'warning');
          }
          if (err.error.errors.title) {
            this._alert.showAlert(`${err.error.errors.title}`, 'warning');
          }
          if (err.error.errors.reqiured_donation) {
            this._alert.showAlert(`${err.error.errors.reqiured_donation}`, 'warning');
          }

        }
      },
    });
  }
}
