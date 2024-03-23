import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { API_FAMILY_SERVICE } from 'src/app/constants/baseurls.constants';

const BASE_URL = API_FAMILY_SERVICE
@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http:HttpClient) { }
  
  getFamily(searchTerm: any): Observable<any> {
    const payload = { id: searchTerm.family };
    return this.http.post(BASE_URL + 'family/getFamily', payload);
  }

  getFamilyById(searchTerm: number): Observable<any> {
    const payload = { id: searchTerm };
    return this.http.post(BASE_URL + 'family/getFamilyForEdit', payload);
  }

  getMembersByFamily(id:number):Observable<any> {
    // const payload = { id: id };
    return this.http.get(BASE_URL + 'members/getMembersByFamily/'+ id);
  }

  getFamilies(): Observable<any> {
    return this.http.get(BASE_URL + 'family/getFamilies');
  }

  updateFamily(createRequest:any ,editId:number):Observable<any> {
    return this.http.put(BASE_URL + 'family/editFamily/'+ editId, createRequest);
  }
  
  register(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'family/createFamily', createRequest);
  }
  deleteFamily(id:number):Observable<any> {
    return this.http.delete(BASE_URL + 'family/deleteFamily/'+ id);
  }
}
