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

    email:string='';
    token:string='';
    password:string='';
    confirmpassword:string='';
    success='';
    error='';
    constructor(private _api:APIService){}
    onSubmit(){
      const data ={
        email:this.email,
        token:this.token,
        password:this.password,
        confirmpassword:this.confirmpassword
      };
      this._api.ResetPassword(data).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }


}
