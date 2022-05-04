import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  myAppUrl = 'https://angularcardsvc.azurewebsites.net/';
  myApiUrl = 'api/CreditCards/';
  list?: CreditCard[];
  
  private updateForm = new BehaviorSubject<CreditCard>({} as any);

  constructor(private http: HttpClient) { }

  saveCard(card: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.myAppUrl + this.myApiUrl, card);
  }

  deleteCard(id: number): Observable<CreditCard> {
    return this.http.delete<CreditCard>(this.myAppUrl + this.myApiUrl + id);
  }

  getCards() {
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
                  .then(data => {
                    this.list = data as CreditCard[];
                  })
  }

  updateCard(id: number, card: CreditCard): Observable<CreditCard> {
    return this.http.put<CreditCard>(this.myAppUrl + this.myApiUrl + id, card);
  }

  update(card: CreditCard) {
    this.updateForm.next(card);
  }

  getCard$(): Observable<CreditCard>{
    return this.updateForm.asObservable();
  }
}
