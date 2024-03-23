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
        place: ['',[Validators.required]],
        district: ['',[Validators.required]],
        state: ['',[Validators.required]],
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

  submitForm(){

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
    this.registerForm.reset(); // Reset form values
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key).setErrors(null); // Clear validation errors for each control
    });
    this.registerForm.markAsUntouched(); // Mark form as untouched
  }
}