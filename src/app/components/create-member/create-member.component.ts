import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/service/family.service';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent {
  registerForm: FormGroup;
  existingFamilies: any[]=[];
  constructor(
    private famService: FamilyService,
    private service: MemberService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ){}
  ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['',[Validators.required]],
        phone: ['',[Validators.required]],
        email: [''],
        // dateOfBirth: [''],
        family: ['']
      })
      
      this.famService.getFamilies().subscribe(
        (families) => {
          this.existingFamilies = families;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  
  prepareDataForBackend() {
    const formData = this.registerForm.value;
    const formattedData = {
      name: formData.name,
      phone: parseInt(formData.phone),
      email: formData.email,
      // dateOfBirth: formData.dateOfBirth,
      family: {
        id: parseInt(formData.family) 
      }
    };
    return formattedData;
  }

  submitForm(){
    console.log(this.registerForm.value);
    const dataForBackend = this.prepareDataForBackend();
    this.service.register(dataForBackend).subscribe(
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
