import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/service/family.service';
import { MemberService } from 'src/app/service/member.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent {

  mode: 'create' | 'edit';
  editId: number;
  title:string='';

  registerForm: FormGroup;
  existingFamilies: any[]=[];
  sexOptions = [
    { value: 'MALE', viewValue: 'Male' },
    { value: 'FEMALE', viewValue: 'Female' },
    { value: 'OTHER', viewValue: 'Other' }
  ];
  relationOptions = [
    { value: 'HOUSEHOLDER', viewValue: 'Householder' },
    { value: 'SPOUSE', viewValue: 'Spouse' },
    { value: 'SON', viewValue: 'Son' },
    { value: 'DAUGHTER', viewValue: 'Daughter' }
  ];
  constructor(
    private famService: FamilyService,
    private service: MemberService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['',[Validators.required]],
        alias: [''],
        sex: ['',[Validators.required]],
        relationWithHouseHolder: ['',[Validators.required]],
        phone: [''],
        email: [''],
        dateOfBirth: [''],
        dateOfBaptism: [''],
        dateOfHolyCommunion: [''],
        dateOfJoin: [''],
        reasonOfJoin: [''],
        education: [''],
        dateOfLeaving: [''],
        reasonOfLeaving: [''],
        image: [''],
        family: ['',[Validators.required]],
        parentFamily: ['']

      })
      
      this.famService.getFamilies().subscribe(
        (families) => {
          this.existingFamilies = families;
        },
        (error) => {
          console.error(error);
        }
      );

      this.route.queryParams.subscribe(params => {
        this.editId = params['id'];
        this.mode = params['mode'];;
        if (this.editId) {
          this.service.getMemberById(this.editId).subscribe(
            (response) => {
              console.log(response);   
              const currentUserFamily = this.existingFamilies.find(family => family.id === response.family.id);
              const currentUserParentFamily = this.existingFamilies.find(family => family.id === response.parentFamily.id);
   
              this.registerForm.patchValue({
                name: response.name,
                alias: response.alias,
                sex: response.sex,
                relationWithHouseHolder: response.relationWithHouseHolder,
                phone: response.phone,
                email: response.email,
                dateOfBirth: response.dateOfBirth,
                dateOfBaptism: response.dateOfBaptism,
                dateOfHolyCommunion: response.dateOfHolyCommunion,
                dateOfJoin: response.dateOfJoin,
                reasonOfJoin: response.reasonOfJoin,
                education: response.education,
                dateOfLeaving: response.dateOfLeaving,
                reasonOfLeaving: response.reasonOfLeaving,
                image: response.image,
                family: currentUserFamily ? currentUserFamily.id : null,
                parentFamily: currentUserParentFamily ? currentUserParentFamily.id : null
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
    const formattedData: any = {
      name: formData.name,
      alias: formData.alias,
      sex: formData.sex,
      relationWithHouseHolder: formData.relationWithHouseHolder,
      phone: formData.phone,
      email: formData.email,
      reasonOfJoin: formData.reasonOfJoin,
      education: formData.education,
      reasonOfLeaving: formData.reasonOfLeaving,
      family: { id: parseInt(formData.family) || null },
      parentFamily: { id: parseInt(formData.parentFamily) || null }
    };
  
    // Date fields
    const dateFields = [
      'dateOfBirth',
      'dateOfBaptism',
      'dateOfHolyCommunion',
      'dateOfJoin',
      'dateOfLeaving'
    ];
  
    dateFields.forEach(field => {
      if (formData[field]) {
        const date = new Date(formData[field]);
        const isoString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        formattedData[field] = isoString;
      } else {
        formattedData[field] = null;
      }
    });
  
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
      this.service.updateMember(dataForBackend, this.editId).subscribe(
        (response)=> {
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
      this.service.register(dataForBackend).subscribe(
        (response)=> {
          console.log("register success");
          // this.registerForm.reset();
          this.resetForm();
          this.showSuccessMessage('Member registered successfully');
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