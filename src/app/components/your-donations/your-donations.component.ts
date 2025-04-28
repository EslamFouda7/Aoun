import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth-service.service';
import { DonationRequest } from '../../models/DonationRequest.model';
import { CommonModule } from '@angular/common';
import { DonationModalComponent } from '../donation-modal/donation-modal.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StatsDonationRequest } from '../../models/StatsDonationRequest.model';
import { donation } from '../../models/donation.model';
import { DonationItem } from '../../models/Dontaionitem.model';

@Component({
  selector: 'app-your-donations',
  standalone: true,
  imports: [CommonModule, DonationModalComponent, RouterLink],
  templateUrl: './your-donations.component.html',
  styleUrl: './your-donations.component.css',
})
export class YourDonationsComponent implements OnInit {
  constructor(private _api: APIService, private _auth: AuthService) {}

  userId: number | null = null;
  items: DonationItem[] = [];
  loading: boolean = true;
  imgurl = environment.imgurl;
  totalUserDonation: number = 0;
  currency: string = 'USD';

  ngOnInit(): void {
    this.userId = this._auth.getUserId();
    if (this.userId) {
      this._api.GetDonorDonations(this.userId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.items = res.data;
          this.totalUserDonation = this.items.reduce(
            (sum, item) => sum + Number(item.donation.amount),
            0
          );
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
