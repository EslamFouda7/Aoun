import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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
  constructor(private _api:APIService,private _alert:AlertService){}
  onSubmit(){
    this._api.ForgetPassword({email:this.email}).subscribe({
      next:(res:any)=>{
        console.log(res)
          this._alert.showAlert(`${res.message}`,'success')
          this.success=res.message
          this.error='';
      },
      error:(err)=>{
        console.log(err)
        this._alert.showAlert(`${err.error.message}`,'error')
        this.error=err.error.message
      }
    })
  }

}
