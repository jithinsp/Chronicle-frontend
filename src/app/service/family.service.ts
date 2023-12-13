import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8083/"
@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http:HttpClient) { }
  
  getFamily(searchTerm: any): Observable<any> {
    const payload = { id: searchTerm.family };
    return this.http.post(BASE_URL + 'register/getFamily', payload);
  }

  getFamilies(): Observable<any> {
    return this.http.get(BASE_URL + 'register/getFamilies');
  }
  
  register(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'register/createFamily', createRequest);
  }
  
  deleteFamily(id:number):Observable<any> {
    return this.http.delete(BASE_URL + 'register/deleteFamily/'+ id);
  }
}
