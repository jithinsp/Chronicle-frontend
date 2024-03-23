import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ACCOUNTS_SERVICE,API_MEMBER_SERVICE } from 'src/app/constants/baseurls.constants';

const BASE_URL = API_ACCOUNTS_SERVICE;
const MEMBER_BASE_URL = API_MEMBER_SERVICE;
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  // getCashByType(type: number): Observable<any> {
  //   return this.http.get(BASE_URL + 'accounts/cash/getCashByType/'+ type);
  // }

  getCashByType(type: number, year?: number, month?: number): Observable<any> {
    let url = `${BASE_URL}cash/getCashByType/${type}`;
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    }
    return this.http.get<any>(url);
  }

  getCashByMember(id: number, year?: number, month?: number): Observable<any> {
    let url = `${BASE_URL}cash/getCashByMember/${id}`;
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    }
    return this.http.get<any>(url);
  }

  getTypes(): Observable<any> {
    return this.http.get(BASE_URL + 'type/getAllAccountTypes');
  }
  
  register(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'type/createAccountType', createRequest);
  }
  getCash(year?: number, month?: number): Observable<any> {
    let url = `${BASE_URL}cash/getAllCash`;
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    }
    return this.http.get<any>(url);
    // return this.http.get(BASE_URL + 'cash/getAllCash');
  }
  
  insertCash(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'cash/createCash', createRequest);
  }

  getMembers(): Observable<any> {
    return this.http.get(MEMBER_BASE_URL + 'getMembers');
  }

  deleteType(id:number):Observable<any> {
    return this.http.delete(BASE_URL + 'type/deleteAccountType/'+ id);
  }

  getTypeById(searchTerm: number): Observable<any> {
    const payload = { id: searchTerm };
    return this.http.post(BASE_URL + 'type/AccountType', payload);
  }
  updateType(createRequest:any ,editId:number):Observable<any> {
    return this.http.put(BASE_URL + 'type/editType/'+ editId, createRequest);
  }
  deleteCash(id:number):Observable<any> {
    return this.http.delete(BASE_URL + 'cash/deleteCash/'+ id);
  }
  getCashById(searchTerm: number): Observable<any> {
    const payload = { id: searchTerm };
    return this.http.post(BASE_URL + 'cash/getCash', payload);
  }
  updateCash(createRequest:any ,editId:number):Observable<any> {
    return this.http.put(BASE_URL + 'cash/editCash/'+ editId, createRequest);
  }
}
