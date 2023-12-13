import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8083/"
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http:HttpClient) { }

  getMembers():Observable<any> {
    return this.http.get(BASE_URL + 'register/members/getMembers');
  }

  register(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'register/members/createMember', createRequest);
  }

}
