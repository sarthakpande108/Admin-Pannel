
import { Flowbite } from 'src/app/flowbite.decorator';

import { AccessControlService } from 'src/app/Services/access-control/access-control.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare let $: any;

@Flowbite()
@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent {
  selectedPermissions!: number;
  selectedGivenPermissions!: number;
  viewDetails: boolean = false;
  userDetails: any;
  userPermissions: any;
  pswdVerified: boolean = true
  disableForm1: boolean = true
  permissions = [
    { id: 1, name: 'Dashboard' },
    { id: 2, name: 'User Data' },
    { id: 3, name: 'Expert Data' },
    { id: 4, name: 'Project Data' },
  ];
  givenPermissions = [
    { id: 1, name: 'Dashboard' },
    { id: 2, name: 'User Data' },
    { id: 3, name: 'Expert Data' },
    { id: 4, name: 'Project Data' },
  ];


  adminsData: any = [];
  permissionsData: any = [];
  selectedPermissionsData: any = [];
  admin_permissions: any = [];

  constructor(private accessControlService : AccessControlService){}

  ngOnInit(){
    this.accessControlService.getAdmins().subscribe(data => {
      console.log(data?.data);
      this.adminsData = data?.data;

      // const admin_permissions = this.adminsData.map((admin:any)=>{
      //   return JSON.parse(admin.admin_permissions);
      // });

      // const admin_permissions2 = admin_permissions.map((admin:any)=>{
      //   return admin.map((i:any, index:number)=>{
      //     return this.permissionsData[index];
      //   });
      // })
      // console.log(admin_permissions2);
      // this.admin_permissions = JSON.parse(data?.data.admin_permissions).permissions;
    });


    
    this.accessControlService.getPermissions().subscribe(data => {
      console.log(data?.data);
      this.permissionsData = data?.data;
    });
  }



  addAdminForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]),
    confirm_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]),
    permissions: new FormControl([1,2,3]),
    file: new FormControl(null),
  })


  editAdminForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone_number: new FormControl('', [Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)]),
    permissions: new FormControl([1,2,3]),
    file: new FormControl(null),
  })

  verifyPasswordForm: FormGroup = new FormGroup({
    current_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)])
  })

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]),
    confirm_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)])
  })



  clearAddAdminForm() {
    this.addAdminForm.reset({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
     });
  }

  clearEditAdminForm() {
    this.editAdminForm.reset({
      first_name: '',
      last_name: '',
      phone_number: '',
     });
  }

  clearVerifyPasswordForm() {
    this.editAdminForm.reset({
      first_name: '',
      last_name: '',
      phone_number: '',
     });
  }
  clearResetPasswordForm() {
    this.resetPasswordForm.reset({
      password: '',
      confirm_password: '',
     });
  }


  onSubmitAddAdminForm() {
    if (this.addAdminForm.valid) {
      const data = this.addAdminForm.value;
      console.log(data);
      this.accessControlService.addAdmin(data).subscribe((response:any) => {
        console.log('Admin posted successfully:', response);
        this.clearAddAdminForm();
        document.getElementById('closeAdminFormModel')?.click();
        // this.router.navigate(['/']);
      },
      (error:any)=>{
        console.log('error '+error.message);
      });
      // console.log(data);
    } else {
      this.addAdminForm.markAllAsTouched();
    }
  }

  onSubmitEditAdminForm() {
    if (this.editAdminForm.valid) {
      const data = this.editAdminForm.value;
      console.log(data);
      this.accessControlService.editAdmin(data, this.userDetails.id).subscribe((response:any) => {
        console.log('Admin edited successfully:', response);
        this.clearEditAdminForm();
        this.enabelDisableForm(true);
      },
      (error:any)=>{
        console.log('error '+error.message);
      });
    } else {
      this.editAdminForm.markAllAsTouched();
    }
  }

  onRemoveAdmin(){
    this.accessControlService.removeAdmin({},this.userDetails.id).subscribe((response:any) => {
      console.log('Admin removed successfully:', response);
      this.enabelDisableView(false);
    },
    (error:any)=>{
      console.log('error '+error.message);
    });
  }

  onSubmitVerifyPasswordForm(){
    this.verifyPasswordForm.markAllAsTouched();
    if(this.verifyPasswordForm.valid){
      if(this.userDetails.password == this.verifyPasswordForm.value.current_password){
        this.verifiyOldPSWD(false);
        console.log("password verified");
        this.verifyPasswordForm.reset();
      } else {
        console.log("Your password does not with current password");
      }
    } else {
      console.log("Form is invalid");
    }
  }

  onSubmitResetPasswordForm(){
    if (this.resetPasswordForm.valid) {
      const data = this.resetPasswordForm.value;
      console.log(data);
      this.accessControlService.resetPassword(data, this.userDetails.id).subscribe((response:any) => {
        console.log('Passsword Reset successfully:', response);
        this.clearResetPasswordForm();
        this.verifiyOldPSWD(true);
        this.resetPasswordForm.reset();
      },
      (error:any)=>{
        console.log('error '+error.message);
      });
      // console.log(data);
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }























  

  enabelDisableForm(val:any) {
      this.disableForm1 = val
  }

  enabelDisableView(val:any) {
      this.viewDetails = val
  }


  
  verifiyOldPSWD(val:boolean) {
    this.pswdVerified = val
  }
  showUserDetails(val: boolean, data?: any) {
    this.userDetails = data;
    this.viewDetails = val;
    console.log(this.userDetails);
    
    this.userPermissions = (JSON.parse(this.userDetails.admin_permissions).permissions).map((i:number, index:number)=>{
      return this.permissionsData[index].name;
    });
    console.log(this.userPermissions);


    // $(document).ready(() => {
    //   console.log($("#main-container")[0].offsetTop);
    //   $("#main-container")[0].scrollTop = 0
    // });
  }

  toggleModal() {
    console.log("clicked");
    if ($("#adduserModal").hasClass('hidden')) {
      console.log("yes");
      $("#adduserModal").removeClass('hidden')

    } else {
      console.log("no");
      $("#adduserModal").addClass('hidden')
    }
  }

  // this.AccessControlService.postData(data:any).subscribe((response:any) => {
  //   console.log('Enterprise Enquiry posted successfully:', response);
  //   this.clearForm();
  //   document.getElementById('closeEnterpriseEnquiryModel')?.click();
  //   // this.router.navigate(['/']);
  // },

  // accessControlData = [
  //   {
  //     id: "1",
  //     profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
  //     name: "Amit Jadhwar",
  //     email: "amit@gmail.com",
  //     permissions: ["dashboard", "access control", "expert data"],
  //     isActive: true
  //   },
  //   {
  //     id: "2",
  //     profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
  //     name: "Rushi Aher",
  //     email: "rushi@gmail.com",
  //     permissions: ["dashboard", "access control", "expert data"],
  //     isActive: false
  //   },
  //   {
  //     id: "3",
  //     profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
  //     name: "Shalil Jaiswar",
  //     email: "shalil@gmail.com",
  //     permissions: ["dashboard", "access control", "expert data"],
  //     isActive: true
  //   },
  //   {
  //     id: "4",
  //     profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
  //     name: "Juned",
  //     email: "juned@gmail.com",
  //     permissions: ["dashboard", "access control", "expert data"],
  //     isActive: true
  //   },

  // ]


  
}
