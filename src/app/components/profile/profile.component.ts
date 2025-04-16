import { Component ,OnInit} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink,RouterLinkActive,RouterOutlet,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  userName: string | null = '';
  userType: string | null = null;
  constructor(private _api:APIService,
    private _Auth:AuthService) {}

  ngOnInit() {
    this._Auth.userName$.subscribe(name => this.userName = name);
    this.userType = this._Auth.getUserType();
    this._Auth.fetchUserData(this._api); // ✅ تجيب الاسم أول ما يدخل على البروفايل
  }
}
