import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/service/family.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-family-register',
  templateUrl: './family-register.component.html',
  styleUrls: ['./family-register.component.css']
})
export class FamilyRegisterComponent {
  familySearchForm: FormGroup | undefined;
  families: any[] = [];
  specificFamily: any | undefined;
  famCheck: boolean = true;


  constructor(
    private service: FamilyService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  openDeleteConfirmation(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFamily(id);
      }
    });
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

  fetchFamilies() {
    this.service.getFamilies().subscribe(
      (response) => {
        this.families = response; // Store fetched families in the array
        console.log(this.families); // Log the fetched families
      },
      (error) => {
        console.error(error);
        // Handle errors if any
      }
    );
  }
  deleteFamily(id: number) {
    this.service.deleteFamily(id).subscribe(
      (response) => {
        console.log(`Family with ID ${id} deleted`);
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
