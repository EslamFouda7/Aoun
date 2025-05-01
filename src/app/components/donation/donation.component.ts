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
import { CardsComponent } from '../cards/cards.component';
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
  loading: boolean = true;
  imgurl = environment.imgurl;
  items: DonationRequest[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private _api: APIService
  ) {}

  ngOnInit(): void {
    this._api.GetAllDonationRequests().subscribe({
      next: (res: any) => {
        console.log('res:', res);
        this.items = res.data.slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });

    //swiper
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
