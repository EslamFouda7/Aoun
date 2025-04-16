import { Component, OnInit} from '@angular/core';
import { RouterLink ,Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink ,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router,private _Auth:AuthService) {}
  UserType:string | null='';
  ngOnInit() {
    this.UserType= this._Auth.getUserType()
  }

  scrollToSection(sectionId: string) {
    if (this.router.url === '/home') {
      // اذا كنت  في الصفحة الرئيسية قم بالتمرير
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      //  اذا لم تكن في الصفحة الرئيسية انتقل إليها الاول ثم قم بالتمرير
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // تأخير لضمان تحميل الصفحة قبل تنفيذ التمرير
      });
    }
  }
}
