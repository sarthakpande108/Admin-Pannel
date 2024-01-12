import { Flowbite } from 'src/app/flowbite.decorator';

import { AccessControlService } from 'src/app/Services/access-control/access-control.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/app/environments/environment';

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
  passwordVerified: boolean = true
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
  selectedFile!: File;
  imageSrc!: string | ArrayBuffer;

  
  emailRegex = /^\S+@\S+\.\S+$/;
  phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  passwordRegex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/; 

// ---------------------------------------------------------------------------------------------
  getAdminAccessControls(){
    this.accessControlService.getAdmins().subscribe((data: any) => {

      this.adminAccessControls = [];
      this.adminAccessControls = data?.data;
    });
  }

  getAllPermissions() {
    this.accessControlService.getPermissions().subscribe((data: any) => {

      this.permissionsData = [];
      this.permissionsData = data?.data;
    });
  }
// ---------------------------------------------------------------------------------------------


  constructor(private accessControlService : AccessControlService, private fb: FormBuilder){}

  ngOnInit() {
  
    this.getAdminAccessControls();
    this.getAllPermissions();

    this.accessControlForm = this.fb.group({
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      'phone_number': ['', [Validators.required, Validators.pattern(this.phoneNumberRegex)]],
      'password': ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      'confirm_password': ['', Validators.required], 
      'permissions': [[], Validators.required], 
      'file': ['']
    });
  }


  verifyPasswordForm: FormGroup = new FormGroup({
    current_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)])
  })

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]),
    confirm_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)])
  })

// ---------------------------------------------------------------------------------------------
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

      // formData.append('file', this.accessControlForm.get('file')?.value, this.accessControlForm.get('file')?.value.name);


      // Append file to FormData
      // const file = this.accessControlForm.get('file')?.value;
      if (file instanceof File) {
        formData.append('file', this.accessControlForm.get('file')?.value);
      }

      this.accessControlService.addAdmin(formData).subscribe(
        (response: any) => {
          console.log('Admin posted successfully:', response);
          this.accessControlForm.reset();
          this.getAdminAccessControls();
        },
        (error: any) => {
          console.log('error ' + error.message);
        }
      );
    } else {
      this.accessControlForm.markAllAsTouched();
    }
  } 

  // SARTHAK UPDATE HERE
  editAccessControl(): void {

  }

  removeAccessControl(){
    this.accessControlService.removeAdmin({},this.userDetails.id).subscribe((response:any) => {
      console.log('Admin removed successfully:', response);
      this.enabelDisableView(false);
      this.getAdminAccessControls();
    },
    (error:any)=>{
      console.log('error '+error.message);
    });
  }

  verifyPassword(){
    if (this.verifyPasswordForm.valid) {
      const current_password = this.verifyPasswordForm.get('current_password')?.value;
      this.accessControlService.verifyPassword(current_password, this.userDetails.id).subscribe((response:any) => {

        if(response.data){
          console.log("Password Verified");
          this.verifiyPasswordToggle(false);
          this.verifyPasswordForm.reset();
        } else {
          console.log("Unable to verify password");
        }
      },
      (error:any)=>{
        console.log('error '+error.message);
      });
    } else {
      this.verifyPasswordForm.markAllAsTouched();
    }
  }

  resetPassword(){
    if (this.resetPasswordForm.valid) {
      const data = this.resetPasswordForm.value;
      this.accessControlService.resetPassword(data, this.userDetails.id).subscribe((response:any) => {
        console.log('Passsword Reset successfully:', response);
        this.resetPasswordForm.reset();
        this.verifiyPasswordToggle(true);
      },
      (error:any)=>{
        console.log('error '+error.message);
      });
      // console.log(data);
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
// ---------------------------------------------------------------------------------------------





// ---------------------------------------------------------------------------------------------
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.accessControlForm.patchValue({ file });
    }
  }

  displaySelectedFile(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
    this.selectedFile = file;

    // Use FileReader to read and display the image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Update the image source dynamically
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  }

  getPermissionsByIds(jsonString: string) {
    const parsedJson = JSON.parse(jsonString);
    
    const arr = parsedJson.permissions.map((id: number) => {
      const permission = this.permissionsData.find((permission:any) => permission.id === id);
      return permission ? permission.name : null;
    });

    if (arr.length <= 3) return [arr, 0];
    return [arr.slice(0, 3), arr.length - 3];
  }

  getImageUrl(filename: string){
    return `${this.assetUrl}${filename}`
  }

  verifiyPasswordToggle(val:boolean) {
    this.passwordVerified = val
  }

  showUserDetails(val: boolean, data?: any) {
    this.userDetails = data;
    this.viewDetails = val;

    const parsedJson = JSON.parse(this.userDetails.admin_permissions);
    
    this.userPermissions = parsedJson.permissions.map((id: number) => {
      const permission = this.permissionsData.find((permission:any) => permission.id === id);
      return permission ? permission.name : null;
    });
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

  enabelDisableForm(val:any) {
    this.disableForm1 = val
  }

  enabelDisableView(val:any) {
    this.viewDetails = val
  }

  resetAccessControl(){
    this.accessControlForm.reset()
  }
// ---------------------------------------------------------------------------------------------
}