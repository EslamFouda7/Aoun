import { Component, OnInit } from '@angular/core';
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
  constructor(private _api: APIService) {}
  loading: boolean = true;
  doughnutData: any[] = []; // لتخزين البيانات الخاصة بالرسم البياني
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Quantile, // تغيير إلى ScaleType.Ordinal
    domain: ['#188894', '#A10A28', '#C7B42C', '#77DD77', '#AAAAAA'], // ألوان الرسم البياني
  };

  ngOnInit(): void {
    this._api.GetRequestsByLocation().subscribe({
      next: (res: any) => {
        console.log(res);
        const data = res.data;
        // تحويل البيانات لتناسب الرسم البياني
        this.doughnutData = data.map((item: any) => ({
          name: item.location,
          value: item.percentage,
          requestsCount: item.requests_count, // إضافة الـ count
        }));
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
