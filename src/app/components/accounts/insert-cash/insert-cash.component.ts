import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-insert-cash',
  templateUrl: './insert-cash.component.html',
  styleUrls: ['./insert-cash.component.css']
})
export class InsertCashComponent {

  mode: 'create' | 'edit';
  editId: number;
  title: string = '';
  registerForm: FormGroup;
  members: any[] = [];
  accountType: any[] = [];

  constructor(
    private service: AccountsService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      amount: ['', [Validators.required]],
      members: [''],
      remarks: [''],
      accountType: [''],
      date: ['', [Validators.required]]
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
    this.route.queryParams.subscribe(params => {
      this.editId = params['id'];
      this.mode = params['mode'];
      if (this.editId) {
        this.service.getCashById(this.editId).subscribe(
          (response) => {
            console.log(response);   
            const currentMember= this.members.find(member => member.id === response.members.id);
            const currentType = this.accountType.find(type => type.id === response.accountType.id);
 
            this.registerForm.patchValue({
              amount: response.amount,
              remarks: response.remarks,
              members: currentMember ? currentMember.id : null,
              accountType: currentType ? currentType.id : null,
              date: response.date
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

  prepareDataForBackend() {
    const formData = this.registerForm.value;
    const formattedData = {
      amount: formData.amount,
      remarks: formData.remarks,
      members: {
        id: parseInt(formData.members)
      },
      accountType: {
        id: parseInt(formData.accountType)
      },
      date: formData.date
    };
    const field = 'date';

    if (formData[field] instanceof Date) {
      const date = new Date(formData[field]);
      const isoString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      formattedData[field] = isoString;
    } 
    return formattedData;
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
      const dataForBackend = this.prepareDataForBackend();
      this.service.updateCash(dataForBackend, this.editId).subscribe(
        (response) => {
          console.log("updation success");
          // this.registerForm.reset();
          this.resetForm();
          this.showSuccessMessage('Member updated successfully');
        },
        (error) => {
          console.error(error);
          this.isSubmitting = false;
        }
      );
    } else {

      console.log(this.registerForm.value);
      const dataForBackend = this.prepareDataForBackend();
      this.service.insertCash(dataForBackend).subscribe(
        (response) => {
          console.log("cash registered successfully");
          // this.registerForm.reset();
          this.resetForm();
          this.showSuccessMessage('cash registered successfully');
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
