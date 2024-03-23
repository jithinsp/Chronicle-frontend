import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8200/"
@Injectable({
  providedIn: 'root'
})
export class AccountsService {




  constructor(private http:HttpClient) { }

  // getCashByType(type: number): Observable<any> {
  //   return this.http.get(BASE_URL + 'accounts/cash/getCashByType/'+ type);
  // }

  getCashByType(type: number, year?: number, month?: number): Observable<any> {
    let url = `${BASE_URL}accounts/cash/getCashByType/${type}`;
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    }
    return this.http.get<any>(url);
  }

  getCashByMember(id: number, year?: number, month?: number): Observable<any> {
    let url = `${BASE_URL}accounts/cash/getCashByMember/${id}`;
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    }
    return this.http.get<any>(url);
  }

  getTypes(): Observable<any> {
    return this.http.get(BASE_URL + 'accounts/type/getAllAccountTypes');
  }
  
  register(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'accounts/type/createAccountType', createRequest);
  }
  getCash(year?: number, month?: number): Observable<any> {
    let url = `${BASE_URL}accounts/cash/getAllCash`;
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    }
    return this.http.get<any>(url);
    // return this.http.get(BASE_URL + 'accounts/cash/getAllCash');
  }
  
  insertCash(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'accounts/cash/createCash', createRequest);
  }

  getMembers(): Observable<any> {
    return this.http.get(BASE_URL + 'register/members/getMembers');
  }

  deleteType(id:number):Observable<any> {
    return this.http.delete(BASE_URL + 'accounts/type/deleteAccountType/'+ id);
  }

  getTypeById(searchTerm: number): Observable<any> {
    const payload = { id: searchTerm };
    return this.http.post(BASE_URL + 'accounts/type/AccountType', payload);
  }
  updateType(createRequest:any ,editId:number):Observable<any> {
    return this.http.put(BASE_URL + 'accounts/type/editType/'+ editId, createRequest);
  }
  deleteCash(id:number):Observable<any> {
    return this.http.delete(BASE_URL + 'accounts/cash/deleteCash/'+ id);
  }
  getCashById(searchTerm: number): Observable<any> {
    const payload = { id: searchTerm };
    return this.http.post(BASE_URL + 'accounts/cash/getCash', payload);
  }
  updateCash(createRequest:any ,editId:number):Observable<any> {
    return this.http.put(BASE_URL + 'accounts/cash/editCash/'+ editId, createRequest);
  }
}
