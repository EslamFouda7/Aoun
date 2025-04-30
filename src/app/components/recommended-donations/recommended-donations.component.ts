import { Component, HostListener, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth-service.service';
import { DonationRequest } from '../../models/DonationRequest.model';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DonationModalComponent } from '../donation-modal/donation-modal.component';
import { ChartsComponent } from "../charts/charts.component";
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-recommended-donations',
  standalone: true,
  imports: [CommonModule, RouterLink, DonationModalComponent, ChartsComponent,NgxChartsModule],
  templateUrl: './recommended-donations.component.html',
  styleUrl: './recommended-donations.component.css',
})
export class RecommendedDonationsComponent implements OnInit {
  constructor(private _api: APIService, private _auth: AuthService) {}
  imgurl = environment.imgurl;
  donorId: number | null = null;
  items: DonationRequest[] = [];
  loading: boolean = true;


  //charts
  screenWidth: number = window.innerWidth;
    view: [number, number] = [400, 400];
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.screenWidth = event.target.innerWidth;
      this.updateView();
    }
    updateView() {
      const width = this.screenWidth * 0.8;
      const limitedWidth = Math.min(width, 360);
      this.view = [limitedWidth, 320];
    }
colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Quantile,
    domain: ['#188894', '#A10A28', '#C7B42C', '#77DD77', '#AAAAAA'], // ألوان الرسم البياني
  };
  match_percentage:any[]=[];

  ngOnInit() {
    this.donorId = this._auth.getUserId();
    if (this.donorId) {
      this._api.AiRecommendation(this.donorId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.items = res.recommendations;
          this.match_percentage = this.items.map((item: any) => ({
            name: item.title,  // استخدم العنوان كـ name
            value: item.match_percentage,  // استخدم match_percentage كـ value
          }));
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
