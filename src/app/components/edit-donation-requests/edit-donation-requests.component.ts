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

@Component({
  selector: 'app-edit-donation-requests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './edit-donation-requests.component.html',
  styleUrl: './edit-donation-requests.component.css',
})
export class EditDonationRequestsComponent {
  imgurl=environment.imgurl;
  items: DonationRequest[] = [];
  colected: number = 40000;
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
          this.items = res;
          this.loading=false;
        },
        error: (err) => {
          console.log(err);
          this.loading=false;
        },
      });
    }
  }

  remaining(total: number, donate: number) {
    return this.card_details.remaining(total, donate);
  }
  donatePercentage(total: number, donate: number) {
    return this.card_details.donatePercentage(total, donate);
  }
  showDonationSteps(item: any) {
    return this._alert.showDonationSteps(item);
  }
}
