import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config'; // ✅ إضافة استيراد appConfig

// تسجيل Swiper كـ Web Component
register();

bootstrapApplication(AppComponent, {
  ...appConfig, // ✅ تمرير إعدادات appConfig
  providers: [
    ...appConfig.providers, // ✅ تمرير جميع الـ providers من appConfig
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }) // ✅ التمرير لأعلى عند تغيير الصفحة
    )
  ]
  
}).catch((err) => console.error(err));
