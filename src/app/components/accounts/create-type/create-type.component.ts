import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css']
})
export class CreateTypeComponent {
  registerForm: FormGroup;
  constructor(
    private service: AccountsService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      type: ['',[Validators.required]],
      description: [''],
    })
  }
  submitForm(){
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe(
      (response)=> {
        console.log("register success");
        // this.registerForm.reset();
        this.resetForm();
        this.showSuccessMessage('Type registered successfully');
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
