import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth-service.service';
import { DonationRequest } from '../../models/DonationRequest.model';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DonationModalComponent } from '../donation-modal/donation-modal.component';
import { ChartsComponent } from "../charts/charts.component";

@Component({
  selector: 'app-recommended-donations',
  standalone: true,
  imports: [CommonModule, RouterLink, DonationModalComponent, ChartsComponent],
  templateUrl: './recommended-donations.component.html',
  styleUrl: './recommended-donations.component.css',
})
export class RecommendedDonationsComponent implements OnInit {
  constructor(private _api: APIService, private _auth: AuthService) {}
  imgurl = environment.imgurl;
  donorId: number | null = null;
  items: DonationRequest[] = [];
  loading: boolean = true;



  ngOnInit() {
    this.donorId = this._auth.getUserId();
    if (this.donorId) {
      this._api.AiRecommendation(this.donorId).subscribe({
        next: (res: any) => {
          // هنا نستخدم الـ interface
          console.log(res);
          this.items = res.recommendations; // هنا نقوم بتعيين البيانات للـ items
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  selectedItem: any;
  isModalVisible: boolean = false;

  openModal(item: any) {
    this.selectedItem = item;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
