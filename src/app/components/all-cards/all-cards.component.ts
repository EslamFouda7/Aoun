import { Component } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { ChartsComponent } from "../charts/charts.component";

@Component({
  selector: 'app-all-cards',
  standalone: true,
  imports: [CardsComponent, HeaderComponent, FooterComponent, CommonModule, ChartsComponent],
  templateUrl: './all-cards.component.html',
  styleUrl: './all-cards.component.css'
})
export class AllCardsComponent {

}
