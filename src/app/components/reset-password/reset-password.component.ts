import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

    email:string='';
    token:string='';
    password:string='';
    confirmpassword:string='';
    success='';
    error='';
    constructor(private _api:APIService,
      private route:ActivatedRoute
    ){}
    ngOnInit(): void {
      // استخراج التوكن والإيميل من الرابط
      this.token = this.route.snapshot.queryParamMap.get('token') || '';
      this.email = this.route.snapshot.queryParamMap.get('email') || '';
    }
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
