import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { SignupComponent } from "../signup/signup.component";
import { DonationComponent } from "../donation/donation.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, DonationComponent, HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
