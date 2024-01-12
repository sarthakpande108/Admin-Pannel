import { Flowbite } from 'src/app/flowbite.decorator';

import { AccessControlService } from 'src/app/Services/access-control/access-control.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/app/environments/environment';

import * as bcrypt from 'bcryptjs';

declare let $: any;

@Flowbite()
@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent {
  assetUrl: string = environment.assetUrl;
  selectedPermissions!: number;
  selectedGivenPermissions!: number;
  viewDetails: boolean = false;
  userDetails: any;
  userPermissions: any;
  pswdVerified: boolean = true
  disableForm1: boolean = true
  permissions:any = [
   
  ];
  givenPermissions = [
   
  ];


  adminAccessControls: any = [];
  permissionsData: any = [];
  selectedPermissionsData: any = [];
  selectedPermissionsData2: any = [];
  admin_permissions: any = [];
  accessControlForm!: FormGroup;
  constructor(private accessControlService : AccessControlService, private fb: FormBuilder){}

  ngOnInit() {
    
    this.getAdminAccessControls();
    this.getAllPermissions();

    this.accessControlForm = this.fb.group({
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      'phone_number': ['', [Validators.required]],
      'password': ['', Validators.required],
      'confirm_password': ['', Validators.required], 
      'permissions': [[], Validators.required], 
      'file': ['']

    });
//  this.accessControlService.getAdmins().subscribe((data:any) => {
//       console.log(data?.data);
//     });
  this.getAllPermissions()
    
   
  }



  getAdminAccessControls(){
    this.accessControlService.getAdmins().subscribe((data: any) => {

      this.adminAccessControls = [];
      this.adminAccessControls = data?.data;
      console.log(this.permissionsData);
      console.log(data.data);
    });
  }

  getAllPermissions() {
    this.accessControlService.getPermissions().subscribe((data: any) => {

      this.permissionsData = [];
      this.permissionsData = data?.data;
      console.log(this.permissionsData);
      console.log(data.data);
    });
  }


   

  addAdminForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[-. (](\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]),
    confirm_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]),
    permissions: new FormControl([]),
    file: new FormControl(null),
  })



  onPermissionChangeAdd(event:any){
    this.selectedPermissionsData=event
    console.log("selected permisssion",this.selectedPermissionsData)
    this.addAdminForm.get('permissions')?.setValue(this.selectedPermissionsData);
    console.log(this.addAdminForm.value);
  }


  editAdminForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone_number: new FormControl('', [Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[-. (](\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s$/)]),
    permissions: new FormControl([]),
    file: new FormControl(null),
  })

  onPermissionChangeEdit(event:any){
    this.selectedPermissionsData2=event
    console.log("selected permisssion",this.selectedPermissionsData2)
    this.editAdminForm.value.permissions=this.selectedPermissionsData2;
    console.log(this.editAdminForm.value);
   }

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


  // onSubmitAddAdminForm() {
  //   if (this.addAdminForm.valid) {
  //     const data = this.addAdminForm.value;
  //     console.log(data);
  //     this.accessControlService.addAdmin(data).subscribe((response:any) => {
  //       console.log('Admin posted successfully:', response);
  //       this.clearAddAdminForm();
  //       document.getElementById('closeAdminFormModel')?.click();
  //       // this.router.navigate(['/']);
  //     },
  //     (error:any)=>{
  //       console.log('error '+error.message);
  //     });
  //     // console.log(data);
  //   } else {
  //     this.addAdminForm.markAllAsTouched();
  //   }
  // }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.accessControlForm.patchValue({ file });
    }
  }

  onSubmitAddAdminForm(): void {
    if (this.addAdminForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.addAdminForm.get('first_name')?.value);
      formData.append('last_name', this.addAdminForm.get('last_name')?.value);
      formData.append('email', this.addAdminForm.get('email')?.value);
      formData.append('phone_number', this.addAdminForm.get('phone_number')?.value);
      formData.append('password', this.addAdminForm.get('password')?.value);
      formData.append('confirm_password', this.addAdminForm.get('confirm_password')?.value);
      formData.append('permissions', JSON.stringify(this.addAdminForm.get('permissions')?.value));

      // Append file to FormData
      const file = this.addAdminForm.get('file')?.value;
      if (file instanceof File) {
        formData.append('file', file);
      }

      this.accessControlService.addAdmin(formData).subscribe(
        (response: any) => {
          console.log('Admin posted successfully:', response);
          this.clearAddAdminForm();
          document.getElementById('closeAdminFormModel')?.click();
        },
        (error: any) => {
          console.log('error ' + error.message);
        }
      );
    } else {
      this.addAdminForm.markAllAsTouched();
    }
  }


  addAccessControl(): void {
    console.log(this.accessControlForm.valid)
    console.log(this.accessControlForm)
    if (this.accessControlForm.valid) {
      const formData = new FormData();
      let {first_name, last_name, email, phone_number, password, permissions, file} = this.accessControlForm.value
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      formData.append('phone_number', phone_number);
      formData.append('password', password);
      formData.append('admin_permissions', JSON.stringify({permissions: permissions}));
      // formData.append('file', file, file.name);

      formData.append('file', this.accessControlForm.get('file')?.value, this.accessControlForm.get('file')?.value.name);



      // // Append file to FormData
      // const file = this.addAdminForm.get('file')?.value;
      // if (file instanceof File) {
      //   formData.append('file', file);
      // }

      this.accessControlService.addAdmin(formData).subscribe(
        (response: any) => {
          console.log('Admin posted successfully:', response);
          this.accessControlForm.reset()
          // this.clearAddAdminForm();
          // document.getElementById('closeAdminFormModel')?.click();
        },
        (error: any) => {
          console.log('error ' + error.message);
        }
      );
    } else {
      // this.addAdminForm.markAllAsTouched();
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























  // hashPassword(password: string) {
  //   const saltRounds = 10;
  //   bcrypt.hash(password, saltRounds, (err:any, hash:any) => {
  //     if (!err) {
  //       return hash;
  //     } else {
  //       console.error('Error hashing password:', err);
  //     }
  //   });
  // }

  // comparePasswords(candidatePassword: string, hashedPassword: string) {
  //   bcrypt.compare(candidatePassword, hashedPassword, (err:any, result:bool) => {
  //     if (!err) {
  //       if (result) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       console.error('Error comparing passwords:', err);
  //     }
  //   });
  // }










  getPermissionsByIds(jsonString: string) {
    const parsedJson = JSON.parse(jsonString);
    
    const arr = parsedJson.permissions.map((id: number) => {
      const permission = this.permissionsData.find((permission:any) => permission.id === id);
      return permission ? permission.name : null;
    });

    console.log(arr);
  
    if (arr.length <= 3) return [arr, 0];
    return [arr.slice(0, 3), arr.length - 3];
  }
  
  



  // getPermissions(jsonString: string) {
  //   const arr = (JSON.parse(jsonString).permissions);
  //   return [arr.slice(0,4),arr.length-3];
  // }


  // getPermissions(jsonString: string) {
  //   const arr = JSON.parse(jsonString).permissions;
  //   return [arr.slice(0,4),arr.length-3];
  // }

 
  getImageUrl(filename: string){
    return `${this.assetUrl}${filename}`
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

    const parsedJson = JSON.parse(this.userDetails.admin_permissions);
    
    this.userPermissions = parsedJson.permissions.map((id: number) => {
      const permission = this.permissionsData.find((permission:any) => permission.id === id);
      return permission ? permission.name : null;
    });

    
    // this.userPermissions = (JSON.parse(this.userDetails.admin_permissions).permissions).map((i:number, index:number)=>{
    //   return this.permissionsData[index].name;
    // });
    // console.log(this.userPermissions);



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