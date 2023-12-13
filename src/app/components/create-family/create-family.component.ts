import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.css']
})
export class CreateFamilyComponent {

  registerForm: FormGroup;
  constructor(
    private service: FamilyService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
      this.registerForm = this.fb.group({
        houseName: ['',[Validators.required]],
        area: ['',[Validators.required]],
        place: ['',[Validators.required]],
        district: ['',[Validators.required]],
        state: ['',[Validators.required]],
        postCode: ['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      })
  }

  submitForm(){
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe(
      (response)=> {
        console.log("register success");
        // this.registerForm.reset();
        this.resetForm();
        this.showSuccessMessage('User registered successfully');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration for which the snackbar is displayed (in milliseconds)
    });
  }

  resetForm() {
    this.registerForm.reset(); // Reset form values
    // this.registerForm.markAsPristine(); // Mark form as pristine
    this.registerForm.markAsUntouched(); // Mark form as untouched
  }
}