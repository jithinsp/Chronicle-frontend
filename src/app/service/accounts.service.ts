import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8084/accounts/"
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  getTypes(): Observable<any> {
    return this.http.get(BASE_URL + 'type/getAllAccountTypes');
  }
  
  register(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'type/createAccountType', createRequest);
  }
  getCash(): Observable<any> {
    return this.http.get(BASE_URL + 'cash/getAllCash');
  }
  
  insertCash(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'cash/createCash', createRequest);
  }

  getMembers(): Observable<any> {
    return this.http.get(BASE_URL + 'member/getMembers');
  }
}
