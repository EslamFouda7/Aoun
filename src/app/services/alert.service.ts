import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  //الاشعار ال بيظهر فوق بعد التسجيل او التغييرات
  constructor() {}
  showAlert(message: string, icon: 'success' | 'error' | 'warning' ) {
    Swal.fire({
      toast: true,
      icon: icon,
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'rgba(4, 74, 82, .9)',
      color: '#ffffff',
      showClass: { popup: 'animate__animated animate__zoomIn' },
      hideClass: { popup: 'animate__animated animate__zoomOut' },
    });
  }

}
