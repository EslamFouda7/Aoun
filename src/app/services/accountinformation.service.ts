import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountinformationService {
  persons: any={
      Full_Name: "eslam alamer abdallah",
      Email: 'Eslamamer@gmail.com',
      Phone: '01029485081',
      Preferred_Donation:'Money',
      Location: 'Cairo',
    }


  getperson(){
    return this.persons;
  }
   // تحديث بيانات المستخدم
  updateUserData(newpersonData: any) {
    this.persons = { ...this.persons, ...newpersonData }; // ✅ دمج البيانات الجديدة مع البيانات القديمة
    console.log("Updated Person:", this.persons);
}
  constructor() { }
}
