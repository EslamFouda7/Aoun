import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CardDetailsService } from '../../services/card-details.service';
import { CardsComponent } from "../cards/cards.component";
import { AlertService } from '../../services/alert.service';
import { APIService } from '../../services/api.service';
import { DonationRequest } from '../../models/DonationRequest.model';
import { AuthService } from '../../services/auth-service.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DonationComponent implements OnInit {
  imgurl=environment.imgurl;
  items: DonationRequest[]=[];
  colected:number=40000;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private _api:APIService,
    private card_details:CardDetailsService,
    private _alert:AlertService,
    private authService:AuthService,
    private router:Router
  ) {

  }
  showDonationSteps(item: any) {
    if (this.authService.getToken()) {
      this._alert.showDonationSteps(item);
    } else {
      this._alert.showAlert('You must be logged in to donate.','error');
      this.router.navigate(['/signin']);
    }

  }

 remaining(total:number,donate: number){
      return this.card_details.remaining(total,donate)
    }
    donatePercentage(total:number,donate: number){
      return this.card_details.donatePercentage(total,donate)
    }
  //swiper
  ngOnInit(): void {



    this._api.GetAllDonationRequests().subscribe({
      next: (res: any) => {
        console.log('res:', res);
        this.items = res.data.slice(0, 5);;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });











    if (isPlatformBrowser(this.platformId)) {
      // يتم تنفيذ الكود فقط إذا كنا في المتصفح
      setTimeout(() => {
        const swiperEl = document.querySelector('swiper-container') as any;
        if (swiperEl) {
          swiperEl.initialize(); // إعادة تهيئة Swiper يدويًا
        }
      }, 100);
    }
  }
}
