import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { API_MEMBER_SERVICE } from 'src/app/constants/baseurls.constants';

const BASE_URL = API_MEMBER_SERVICE
@Injectable({
  providedIn: 'root'
})
export class MemberService {



  constructor(private http:HttpClient,
    private jwtService:JwtService) { }

  getMembers():Observable<any> {
    return this.http.get(BASE_URL + 'getMembers');
  }

  getMemberById(editId: number): Observable<any> {
    const payload = { id: editId };
    return this.http.post(BASE_URL + 'getMember', payload);
  }

  register(createRequest:any):Observable<any> {
    return this.http.post(BASE_URL + 'createMember', createRequest);
  }

  private familyMembersSubject = new BehaviorSubject<any[]>([]);

  updateMembersData(members: any[]) {
    this.familyMembersSubject.next(members);
  }

  getFamilyMembers() {
    return this.familyMembersSubject.asObservable();
  }

  deleteMember(id:number):Observable<any> {
    return this.http.delete(BASE_URL + 'deleteMember/'+ id);
  }

  updateMember(createRequest: any, editId: number) :Observable<any> {
    return this.http.put(BASE_URL + 'editMember/'+ editId, createRequest);
  }
}
