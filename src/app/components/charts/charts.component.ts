import { Component, HostListener, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ScaleType, Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent implements OnInit {
  screenWidth: number = window.innerWidth;
  view: [number, number] = [400, 400];
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.updateView();
  }
  updateView() {
    const width = this.screenWidth * 0.8; // 80% من عرض الشاشة
    const limitedWidth = Math.min(width, 360); // حد أقصى 360
    this.view = [limitedWidth, 320]; // العرض والارتفاع النهائي
  }

  constructor(private _api: APIService) {}
  loading: boolean = true;
  PercentageData: any[] = []; // لتخزين البيانات الخاصة بالرسم البياني
  RequestsCountData: any[] = [];
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Quantile,
    domain: ['#188894', '#A10A28', '#C7B42C', '#77DD77', '#AAAAAA'], // ألوان الرسم البياني
  };

  ngOnInit(): void {
    this._api.GetRequestsByLocation().subscribe({
      next: (res: any) => {
        console.log(res);
        const data = res.data;
        // تحويل البيانات لتناسب الرسم البياني
        this.PercentageData = data.map((item: any) => ({
          name: item.location,
          value: item.percentage,
        }));
        this.RequestsCountData = data.map((item: any) => ({
          name: item.location,
          value: item.requests_count,
        }));
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.updateView();
  }
}
