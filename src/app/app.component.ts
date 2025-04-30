import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { CommonModule } from '@angular/common';
import * as AOS from "aos";
import { DonationModalComponent } from "./components/donation-modal/donation-modal.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoadingSpinnerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AOUN';

  //loding لحد ما كل حاجه تحمل
  loading: boolean = true;
  ngOnInit(): void {
    AOS.init();
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
