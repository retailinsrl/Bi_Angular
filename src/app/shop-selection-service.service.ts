import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopSelectionService {
  private selectedShopIdSource = new BehaviorSubject<string>('49'); // Default shop ID
  selectedShopId$ = this.selectedShopIdSource.asObservable();

  setSelectedShopId(shopId: string) {
    this.selectedShopIdSource.next(shopId);
  }
}
