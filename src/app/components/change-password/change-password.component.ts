import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertService } from '../../services/alert.service';
import { APIService } from '../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { privateDecrypt } from 'crypto';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent{
  constructor(private _alert:AlertService,
              private _api:APIService,
              private _Auth:AuthService
  ){}


  current_password:string=''
  new_password:string=''
  new_password_confirmation:string=''
  userId: number | null = null;
  userType: string | null = null;
    savechange(){
      this.userId = this._Auth.getUserId();
      this.userType=this._Auth.getUserType();
      const data ={
        user_type:this.userType,  
        user_id:this.userId,
        current_password:this.current_password,
        new_password:this.new_password,
        new_password_confirmation:this.new_password_confirmation
      };
      this._api.updatePassword(data).subscribe({
        next:(res)=>{
          console.log('Password updated successfully!',res)
          this._alert.showAlert('Password updated successfully!','success');
          this.current_password='';
          this.new_password='';
          this.new_password_confirmation='';
        },
        error:(err)=>{
          console.log('Password updated falid',err)
          if(err.status===401 && err.error.message){
            this._alert.showAlert(`${err.error.message}`,'error');}
          if(err.status===422 && err.error.errors.new_password){
            this._alert.showAlert(`${err.error.errors.new_password}`,'warning');}
          if(err.status===422 && err.error.errors.current_password){
            this._alert.showAlert('The old password field is required.','warning');
          }
        }
      })

  }
  //حفظ التعديل

}
