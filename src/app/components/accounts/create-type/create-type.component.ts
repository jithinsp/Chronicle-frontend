import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css']
})
export class CreateTypeComponent {

  mode: 'create' | 'edit';
  editId: number;
  title: string = '';
  registerForm: FormGroup;

  constructor(
    private service: AccountsService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      type: ['', [Validators.required]],
      alias: [''],
      description: [''],
    })
    this.route.queryParams.subscribe(params => {
      this.editId = params['id'];
      this.mode = params['mode'];;
      if (this.editId) {
        this.service.getTypeById(this.editId).subscribe(
          (response) => {
            console.log("type:" + response);

            this.registerForm.patchValue({
              // id: response.id,
              type: response.type,
              alias: response.alias,
              description: response.description,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
    this.title = (this.mode === 'edit') ? 'Edit' : 'Create';
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
      this.service.updateType(this.registerForm.value, this.editId).subscribe(
        (response) => {
          console.log("updation success");
          // this.registerForm.reset();
          this.resetForm();
          this.showSuccessMessage('Type updated successfully');
          this.isSubmitting = false;
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
        (response) => {
          console.log("register success");
          // this.registerForm.reset();
          this.resetForm();
          this.showSuccessMessage('Type registered successfully');
          this.isSubmitting = false;
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
    this.registerForm.reset(); // Reset form values
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key).setErrors(null); // Clear validation errors for each control
    });
    this.registerForm.markAsUntouched(); // Mark form as untouched
  }
}
