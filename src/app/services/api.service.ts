import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Donor } from '../models/Donor.model';
import { Foundation } from '../models/Foundation.model';
import { DonationRequest } from '../models/DonationRequest.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpclient:HttpClient) {
    console.log('✅ HttpClient is working!');
  }

//بججيب بيانات المتبرع عن طريق id
  GetDonorInfoByid(id:number):Observable<Donor>{
    return this.httpclient.get<Donor>(`${environment.baseUrl}/api/donor/${id}`);
  }
  //بججيب بيانات المؤسسه عن طريق id
  GetFoundationInfoByid(id: number): Observable<{ foundation: Foundation }>{
    return this.httpclient.get<{ foundation: Foundation }>(`${environment.baseUrl}/api/foundation/${id}`);
  }
//بيجب كل الطلبات
  GetAllDonationRequests():Observable<DonationRequest[]>{
    return this.httpclient.get<DonationRequest[]>(`${environment.baseUrl}/api/donation-requests`);
  }
  //بيجيب الطلب عل حسب id
  GetDonationRequestById(id: number) {
    return this.httpclient.get(`${environment.baseUrl}/api/donation-requests/${id}`);
  }

  GetRequestsByFoundationId(foundationId:number){
    return this.httpclient.get(`${environment.baseUrl}/api/foundations/${foundationId}/donation-requests`);
  }



//تسجيل المتبرعين
DonorRegister(donorData:any):Observable<any>{
  const headers = { 'Content-Type': 'application/json' };
  return this.httpclient.post(`${environment.baseUrl}/api/register/donor`,donorData,
    { headers })
}
  //تسجيل المؤسسات
FoundationRegister(foundationData:any):Observable<any>{
  const headers = { 'Content-Type': 'application/json' };
  return this.httpclient.post(`${environment.baseUrl}/api/register/foundation`,foundationData,
    { headers })
}

updateProfile( data: any): Observable<any> {
  const headers= { 'Content-Type': 'application/json' }
  return this.httpclient.post(`${environment.baseUrl}/api/update-profile`, data,
    { headers})
}
updatePassword(data:any){
  const headers= { 'Content-Type': 'application/json' }
  return this.httpclient.post(`${environment.baseUrl}/api/update-password`,data,
    {headers})
  }


DonationRequests(data:any){
  return this.httpclient.post(`${environment.baseUrl}/api/donation-requests` ,data
  )
}
UpdateDonationRequests(id:number,data:any){
  return this.httpclient.put(`${environment.baseUrl}/api/donation-requests/${id}` ,data)
}
}





