import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/service/family.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { MemberService } from 'src/app/service/member.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorIntlService } from 'src/app/service/paginator-intl.service';

@Component({
  selector: 'app-family-register',
  templateUrl: './family-register.component.html',
  styleUrls: ['./family-register.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass:PaginatorIntlService}]
})
export class FamilyRegisterComponent {


  familySearchForm: FormGroup | undefined;
  families: any[] = [];
  specificFamily: any | undefined;
  famCheck: boolean = true;
  displayedColumns: string[] = ['id', 'houseName', 'area', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(
    private service: FamilyService,
    private memService: MemberService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  // openDeleteConfirmation(id: number): void {
  //   const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.deleteFamily(id);
  //     }
  //   });
  // }
  openCreate(){
    this.router.navigateByUrl("create-family");
  }
  openCreateMember() {
    this.router.navigateByUrl("create-member");
    }

    

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(this.famCheck==true){
  //   }
  // }

  ngOnInit(): void {
    this.familySearchForm = this.fb.group({
      family: ['', Validators.required],
    })
    this.fetchFamilies();
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  fetchFamilies() {
    this.service.getFamilies().subscribe(
      (response) => {
        this.families = response; // Store fetched families in the array
        console.log(this.families); // Log the fetched families
        this.dataSource = new MatTableDataSource(this.families);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(error);
        // Handle errors if any
      }
    );
  }
  deleteFamily(id: number) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
      dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteFamily(id).subscribe(
          (response) => {
            console.log(`Family with ID ${id} deleted`);
            this.families = this.families.filter((family) => family.id !== id);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
  editFamily(id: number) {
    const mode ='edit';
    this.router.navigate(['create-family'], { queryParams: { id, mode } });
  }

  viewFamilyMembers(id: number) {
    this.service.getMembersByFamily(id).subscribe(
      (response) => {
        this.memService.updateMembersData(response);
        this.router.navigate(['/family-detailed']);
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  submitForm() {
    this.service.getFamily(this.familySearchForm.value).subscribe(
      (response) => {
        this.specificFamily = response;
        this.famCheck=false;
        console.log(response);
        // Handle the response data
      },
      (error) => {
        console.error(error);
        // Handle errors if any
      }
    );
  }
  
  

}
