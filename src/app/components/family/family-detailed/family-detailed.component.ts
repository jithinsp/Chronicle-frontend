import { Component } from '@angular/core';
import { MemberService } from 'src/app/service/member.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-family-detailed',
  templateUrl: './family-detailed.component.html',
  styleUrls: ['./family-detailed.component.css']
})
export class FamilyDetailedComponent {

  members: any[]=[];
  // panelOpenState = false;
  // displayedColumns: string[] = ['id', 'name', 'sex','relationWithHouseHolder',  'phone', 'email','education',  'dateOfBirth',  'dateOfBaptism',  'dateOfHolyCommunion',  'dateOfJoin','dateOfLeaving','reasonOfLeaving','parentFamily'];
  displayedColumns: string[] = [
    'id',
    'name',
    'sex',
    'relationWithHouseHolder',
    'phone',
    'parentFamily',
    'actions',
    'additionalDetails'
  ];
  

  constructor(
    private service:MemberService,    
    public dialog: MatDialog,
    private router: Router,
    private accountService: AccountsService,
    ){}

  ngOnInit(): void {
    this.fetchMembers();
  }



  fetchMembers() {
    this.service.getFamilyMembers().subscribe(
      (response) => {
        this.members = response;
        // console.log(this.members);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteMember(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
      dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteMember(id).subscribe(
          (response) => {
            console.log(`Member with ID ${id} deleted`);
            this.members = this.members.filter((family) => family.id !== id);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

    editMember(id: any) {
      const mode ='edit';
      this.router.navigate(['create-member'], { queryParams: { id, mode } });
    }

    showCashByMember(id: number){
      this.accountService.getCashByMember(id).subscribe((res) => {
      this.router.navigate(['/cash', -2], { state: { data: res } });
    },
    (error) => {
      console.error(error);
    }
  );
  }
}
