import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,CommonModule,NgxSpinnerModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email:string='';
  success='';
  error='';
  constructor(private _api:APIService,private _alert:AlertService,private spinner:NgxSpinnerService){}
  onSubmit(){
    this.spinner.show();
    this._api.ForgetPassword({email:this.email}).subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        console.log(res)
          this._alert.showAlert(`${res.message}`,'success')
          this.success=res.message
          this.error='';
      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err)
        this._alert.showAlert(`${err.error.message}`,'error')
        this.error=err.error.message
      }
    })
  }

}
