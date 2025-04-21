import { Component, OnInit } from '@angular/core';
import { CardDetailsService } from '../../services/card-details.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AlertService } from '../../services/alert.service';
import { APIService } from '../../services/api.service';
import { DonationRequest } from '../../models/DonationRequest.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AuthService } from '../../services/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { DonationModalComponent } from "../donation-modal/donation-modal.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    DonationModalComponent
],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  selectedItem: any;
  isModalVisible: boolean = false;

  openModal(item: any) {
    this.selectedItem = item;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }





  imgurl=environment.imgurl;
  item: DonationRequest | null = null;
  UserId: number | null = null;
  UserType:string |null =null;
  loading: boolean = true;
  total_donated:number | null =null;
  remaining_amount:number | null =null;
  percentage_completed:number|null =null;





  constructor(
    private route: ActivatedRoute,
    private _alert: AlertService,
    private _api: APIService,
    private _Auth: AuthService
  ) {}






  ngOnInit() {
    //بجيب ال id بتاع اليوزر ال مسجل عشان اقارنه ب idبتاع الموسسه
    this.UserId = this._Auth.getUserId();
    this.UserType = this._Auth.getUserType();

    //بعرض الداتا بتاعه الكارت بس عن طريق idبتاع الخدمه
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this._api.GetDonationRequestById(itemId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.item = res;
        this.loading = false;
      },
      error: (err) => {
        console.log('error', err);
        this.loading = false;
      },
    });

    //بجيب تفاصيل مبالغ التبرع
    this._api.GetRequestStats(itemId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.total_donated=res.data.total_donated;
        this.remaining_amount=res.data.remaining_amount;
        this.percentage_completed=res.data.percentage_completed;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  Save() {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));

    this._api.UpdateDonationRequests(itemId, this.item).subscribe({
      next: (res: any) => {
        console.log(res);
        this.item?.title === res.data.title;
        this.item?.description === res.data.description;
        this.item?.required_amount === res.data.required_amount;
        this._alert.showAlert(`${res.message}`, 'success');
      },
      error: (err) => {
        console.log('Error', err);
        if (err.error.errors.required_amount) {
          this._alert.showAlert(
            'The required amount field is required',
            'warning'
          );
        }
        if (err.error.errors.description) {
          this._alert.showAlert('The description field is required', 'warning');
        }
        if (err.error.errors.title) {
          this._alert.showAlert('The title field is required', 'warning');
        }
      },
    });
  }
}
