import { Component } from '@angular/core';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  members: any[]=[];

  constructor(private service:MemberService){}

  ngOnInit(): void {
    this.fetchMembers();
  }



  fetchMembers() {
    // this.service.getFamilyMembers().subscribe(
    this.service.getMembers().subscribe(
      (response) => {
        this.members = response;
        console.log(this.members);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
