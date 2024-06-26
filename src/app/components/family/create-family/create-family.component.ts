import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/service/family.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.css']
})
export class CreateFamilyComponent {

  mode: 'create' | 'edit';
  editId: number;
  title:string='';

  registerForm: FormGroup;
  constructor(
    private service: FamilyService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
      this.registerForm = this.fb.group({
        familyNumber: ['',[Validators.required]],
        houseName: ['',[Validators.required]],
        alias: [''],
        area: ['',[Validators.required]],
        aliasArea: [''],
        place: [''],
        district: [''],
        state: [''],
        postCode: ['',[Validators.pattern('^[0-9]*$')]],
      })
      this.route.queryParams.subscribe(params => {
        this.editId = params['id'];
        this.mode = params['mode'];;
        if (this.editId) {
          this.service.getFamilyById(this.editId).subscribe(
            (familyDetails) => {
              console.log("fam:"+familyDetails);
              
              this.registerForm.patchValue({
                id: familyDetails.id,
                familyNumber: familyDetails.familyNumber,
                houseName: familyDetails.houseName,
                alias: familyDetails.alias,
                area: familyDetails.area,
                aliasArea: familyDetails.aliasArea,
                place: familyDetails.place,
                district: familyDetails.district,
                state: familyDetails.state,
                postCode: familyDetails.postCode
              });
            },
            (error) => {
              console.error(error);
            }
          );
        }
      });
      this.title=(this.mode==='edit')?'Edit':'Create';
  }

  isSubmitting = false;
  submitForm() {
    // Prevent duplicate submissions
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;

    if (this.mode === 'edit') {
      console.log(this.registerForm.value);
    this.service.updateFamily(this.registerForm.value, this.editId).subscribe(
      (response)=> {
        console.log("updation success");
        // this.registerForm.reset();
        this.resetForm();
        this.showSuccessMessage('Family updated successfully');
      },
      (error) => {
        console.error(error);
        this.isSubmitting = false;
      }
    );
      // Example: this.dataService.updateRecord(this.recordId, this.form.value);
    } else {
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe(
      (response)=> {
        console.log("register success");
        // this.registerForm.reset();
        this.resetForm();
        this.showSuccessMessage('Family registered successfully');
      },
      (error) => {
        console.error(error);
        this.isSubmitting = false;
      }
    );
  }
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration for which the snackbar is displayed (in milliseconds)
    });
  }

  resetForm() {
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.reset();
    this.isSubmitting = false;
  }
}