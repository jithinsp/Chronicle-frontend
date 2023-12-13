import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-insert-cash',
  templateUrl: './insert-cash.component.html',
  styleUrls: ['./insert-cash.component.css']
})
export class InsertCashComponent {
  registerForm: FormGroup;
  members: any[]=[];
  accountType: any[]=[];
  constructor(
    private service: AccountsService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      amount: ['',[Validators.required]],
      members: [''],
      accountType: ['']
    })
    this.service.getTypes().subscribe(
      (type) => {
        this.accountType = type;
      },
      (error) => {
        console.error(error);
      }
    );
    
    this.service.getMembers().subscribe(
      (member) => {
        this.members = member;
      },
      (error) => {
        console.error(error);
      }
    );
}

prepareDataForBackend() {
  const formData = this.registerForm.value;
  const formattedData = {
    amount: formData.amount,
    members: {
      memberId: parseInt(formData.members) 
    },
    accountType: {
      id: parseInt(formData.accountType) 
    }
  };
  return formattedData;
}

submitForm(){
  console.log(this.registerForm.value);
  const dataForBackend = this.prepareDataForBackend();
  this.service.insertCash(dataForBackend).subscribe(
    (response)=> {
      console.log("cash registered successfully");
      // this.registerForm.reset();
      this.resetForm();
      this.showSuccessMessage('cash registered successfully');
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
