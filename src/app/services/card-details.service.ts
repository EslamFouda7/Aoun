import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardDetailsService {

  constructor() {}

  //بترجع كل الداتا
  getallitems() {
    return ;
  }
  //بترجع الداتا ع حسب id
  getItemById(id: number) {
    return ;
  }

  // ✅ تحسب المتبقي
  remaining(total: number, colected: number): number {
    return Math.max(Number(total) - Number(colected), 0);
  }

  // ✅ تحسب نسبة التبرع
  donatePercentage(total: number, colected: number): number {
    const totalAmount = Number(total);
    const donatedAmount = Number(colected);
    if (totalAmount === 0) return 0;
    const percentage = (donatedAmount / totalAmount) * 100;
    return Math.min(Math.round(percentage), 100); // علشان النسبة ماتعديش 100%
  }



  //  تحديث المبلغ المتبرع به
  updateDonationAmount(itemId: number, amount: number) {
    
    return -1; //  لم يتم العثور على العنصر
  }
}
