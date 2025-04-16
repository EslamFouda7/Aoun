import { Component, Input } from '@angular/core';
import { CardDetailsService } from '../../services/card-details.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { AlertService } from '../../services/alert.service';
import { APIService } from '../../services/api.service';
import { DonationRequest } from '../../models/DonationRequest.model';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {

  imgurl=environment.imgurl;
  loading:boolean=true;
  items: DonationRequest[] = [];
  colected: number = 30000;


  constructor(
    private _alert: AlertService,
    private _api: APIService,
    private card_details: CardDetailsService,
  ) {}



  ngOnInit(): void {
    this._api.GetAllDonationRequests().subscribe({
      next: (res: any) => {
        console.log('res:', res);
        this.items = res.data;
        this.loading=false;
      },
      error: (err) => {
        console.log('Error', err);
        this.loading=false;
      },
    });
  }

  showDonationSteps(item: any) {
    this._alert.showDonationSteps(item);
  }



  remaining(total:number,donate: number){
    return this.card_details.remaining(total,donate)
  }
  donatePercentage(total:number,donate: number){
    return this.card_details.donatePercentage(total,donate)
  }
}
