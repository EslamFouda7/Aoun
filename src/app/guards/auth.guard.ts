import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { AlertService } from '../services/alert.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let router = inject(Router);
  let _alert= inject(AlertService);
  if (_authService.getToken()) {
    return true; // السماح بالوصول
  } else {
    _alert.showAlert('You must be logged in','error')
    router.navigate(['/signin']); // إعادة التوجيه إلى تسجيل الدخول
    return false;
  }
};
