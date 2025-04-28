import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, retry } from 'rxjs';
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

  //بيجيب الطلبات الخاصه بالموسسه
  GetRequestsByFoundationId(foundationId:number){
    return this.httpclient.get(`${environment.baseUrl}/api/foundations/${foundationId}/donation-requests`);
  }
  //بيجيب التفاصيل الخاصه بالتبرع
  GetRequestStats(requestId:number){
    return this.httpclient.get(`${environment.baseUrl}/api/donations/request/${requestId}/stats`)
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
//التبرع
StoreDonations(data:any){
  return this.httpclient.post(`${environment.baseUrl}/api/donations`,data)
}

//AI model
AiRecommendation(donorId:number){
  return this.httpclient.get(`${environment.baseUrl}/api/ai/recommend/${donorId}`)
}
//بيجيب الطلبات ع حسب الموقع
GetRequestsByLocation(){
  return this.httpclient.get(`${environment.baseUrl}/api/requests/by-location`)
}

//getDonorDonations
GetDonorDonations(donorId:number){
  return this.httpclient.get(`${environment.baseUrl}/api/donations/donor/${donorId}`)
}
}




