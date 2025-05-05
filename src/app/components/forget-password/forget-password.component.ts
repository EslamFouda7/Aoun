import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email:string='';
  success='';
  error='';
  constructor(private _api:APIService){}
  onSubmit(){

  }

}
