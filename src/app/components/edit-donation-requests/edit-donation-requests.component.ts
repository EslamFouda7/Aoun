import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../cards/cards.component';
import { DonationRequest } from '../../models/DonationRequest.model';
import { RouterLink } from '@angular/router';
import { CardDetailsService } from '../../services/card-details.service';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../../environments/environment.development';
import { DonationModalComponent } from "../donation-modal/donation-modal.component";

@Component({
  selector: 'app-edit-donation-requests',
  standalone: true,
  imports: [CommonModule, RouterLink, DonationModalComponent],
  templateUrl: './edit-donation-requests.component.html',
  styleUrl: './edit-donation-requests.component.css',
})
export class EditDonationRequestsComponent {
  imgurl=environment.imgurl;
  items: DonationRequest[] = [];
  userId: number | null = null;
  loading: boolean = true;
  constructor(
    private _api: APIService,
    private _Auth: AuthService,
    private card_details: CardDetailsService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {

    this.userId = this._Auth.getUserId();
    if (this.userId) {
      this._api.GetRequestsByFoundationId(this.userId).subscribe({
        next: (res: any) => {
          console.log('res', res);
          this.items = res.data;
          this.loading=false;
        },
        error: (err) => {
          console.log(err);
          this.loading=false;
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
