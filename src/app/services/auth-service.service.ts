import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();
  constructor(private http: HttpClient) {
    console.log('httb')
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_type', response.user_type);
        localStorage.setItem('user_id', response.user_id.toString());
        // تحديث BehaviorSubject
        this.updateUserName(response.user_name);
      })
    );
  }

  updateUserName(name: string | null) {
    this.userNameSubject.next(name);
    name ? localStorage.setItem('username', name) : localStorage.removeItem('username');
  }

  fetchUserData(apiService: any): void {
    const userId = this.getUserId();
    const userType = this.getUserType();

    if (!userId || !userType) return;

    if (userType === 'foundation') {
      apiService.GetFoundationInfoByid(userId).subscribe({
        next: (res: any) => {
          this.updateUserName(res.foundation.foundation_name.split(' ')[0]);
        },
        error: (err:any) => {
          console.error('Error fetching foundation data:', err);
        }
      });
    } else if (userType === 'donor') {
      apiService.GetDonorInfoByid(userId).subscribe({
        next: (res: any) => {
          this.updateUserName(res.full_name.split(' ')[0]);
        },
        error: (err:any) => {
          console.error('Error fetching donor data:', err);
        }
      });
    }
  }


  logout() {
    localStorage.clear();
    this.userNameSubject.next(null);
  }

  getUserId(): number | null {
    return localStorage.getItem('user_id') ? Number(localStorage.getItem('user_id')) : null;
  }

  getUserType(): string | null {
    return localStorage.getItem('user_type');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
