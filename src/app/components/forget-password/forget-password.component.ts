import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email:string='';
  success='';
  error='';
  constructor(private _api:APIService){}
  onSubmit(){
    this._api.ForgetPassword({email:this.email}).subscribe({
      next:(res:any)=>{
        console.log(res)
          this.success=res.message

      },
      error:(err)=>{
        console.log(err)
        this.error=err.error.message
      }
    })
  }

}
