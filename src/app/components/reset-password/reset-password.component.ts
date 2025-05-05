import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {


    new_password:string='';
    confirm_password:string='';
    success='';
    error='';
    constructor(private _api:APIService){}
    onSubmit(){

    }


}
