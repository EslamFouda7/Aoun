import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, FooterComponent, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {

  constructor(
    private router: Router,
    private _Auth:AuthService,
    private _alert: AlertService
  ) {}

  email: string = '';
  password: string = '';

  login(){
    this._Auth.login(this.email,this.password).subscribe({
      next:(res)=>{
        this._alert.showAlert(' Signin successful!','success')
        console.log('Signin successful!' ,res)
        this.router.navigate(['/profile']);
      },
      error:(err)=>{
        if(err.status===422 && err.error.errors.password)
          {
            this._alert.showAlert(`${err.error.errors.password}`,'error')
          }
        if(err.status===422 && err.error.errors.email)
        {
          this._alert.showAlert(`${err.error.errors.email}`,'error')
        }
        if (err.status === 401 && err.error.error) {
          this._alert.showAlert('User not found. Please check your email.', 'error');
        }
       console.log('Signin failed!',err)
      }
    })
  }

}
