import { Flowbite } from 'src/app/flowbite.decorator';
import { HttpClient } from '@angular/common/http';

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
  adminAccessControlData:any=[];
  permissionsData: any = [];
  selectedPermissionsData: any = [];
  selectedPermissionsData2: any = [];
  admin_permissions: any = [];
  accessControlForm!: FormGroup;
  accessControlForm2!: FormGroup; 
  // accessControlForm2!: FormGroup;
  selectedFile!: File;
  editSelectedFile!:File
  imageSrc!: string | ArrayBuffer;
  p: any = 1;

  profileImage: any;

  
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
      console.log(this.permissionsData)
    });
  }
// ---------------------------------------------------------------------------------------------


  constructor(private accessControlService : AccessControlService, private fb: FormBuilder,private http: HttpClient){}

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
    },{
      validators: this.passwordMatchValidator
    });
    
    

    this.accessControlForm2 = this.fb.group({
      'first_name': [''],
      'last_name': [''],
      'phone_number': [''],
      'permissions': [[]], 
      'file': ['']
    })
  }



  verifyPasswordForm: FormGroup = new FormGroup({
    current_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)])
  })

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]),
    confirm_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)])
  })
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;
  
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }
  get isConfirmPasswordInvalid() {
    return (
      this.accessControlForm.hasError('passwordMismatch') &&
      this.accessControlForm.get('confirm_password')?.dirty
    );
  }


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
      if (this.selectedFile){
        formData.append('file', this.selectedFile);
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
    console.log(this.accessControlForm2);
    if(this.accessControlForm2.valid  && this.userDetails){
      const updatedPermissions = this.accessControlForm2.get('permissions')?.value;
      const updatedAdminData = {
        ...this.accessControlForm2.value,
        admin_permissions: JSON.stringify({ permissions: updatedPermissions })
      }
      const formData=new FormData();
      formData.append('first_name', this.accessControlForm2.get('first_name')?.value);
      formData.append('last_name', this.accessControlForm2.get('last_name')?.value);
      formData.append('phone_number',this.accessControlForm2.get('phone_number')?.value);
      formData.append('password', this.accessControlForm2.get('password')?.value);
      formData.append('admin_permissions', JSON.stringify({permissions: (this.accessControlForm2.get('permissions')?.value)}));

     console.log(this.selectedFile);
     
      if (this.selectedFile){
        formData.append('file', this.selectedFile);
       }
      this.accessControlService.editAdmin(updatedAdminData, this.userDetails.id).subscribe(
        (response:any)=>{
          console.log("admin updated successfully",response);
          //this.viewDetails=false
          this.getAdminAccessControls();
          this.disableForm1 = !this.disableForm1;
        },
        (error:any)=>{
          console.log("error updating admin",error.message)
        });
    }else{
      this.accessControlForm2.markAllAsTouched()
    }
  }

  onFileEdit(event:any):any {
    const file = event.target.files && event.target.files[0];
    if(file.size > 10485760){
      alert('Image size should be less then 10MB')
      return false;
    } 
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      this.selectedFile=file

    }
    
  }
/*
  editAccessControl(): void {
    console.log(this.accessControlForm2);
    if (this.accessControlForm2.valid && this.userDetails) {
      const updatedPermissions = this.accessControlForm2.get('permissions')?.value;
      
      // Extract the form values
      const updatedAdminData = {
        ...this.accessControlForm2.value,
        admin_permissions: JSON.stringify({ permissions: updatedPermissions }),
      };
  
      // Create FormData object
      const formData = new FormData();
  
      // Append other form data to FormData
      Object.keys(updatedAdminData).forEach(key => {
        formData.append(key, updatedAdminData[key]);
      });
  
      // Check if a new file is selected and append it to FormData
      const file = this.accessControlForm2.get('file')?.value;
      if (file) {
        formData.append('file', file, file.name);
      }
  
      console.log(formData);
  
      // Make the HTTP request
      this.accessControlService.editAdmin(formData, this.userDetails.id).subscribe(
        (response: any) => {
          console.log("Admin updated successfully", response);
          this.getAdminAccessControls();
          this.disableForm1 = !this.disableForm1;
        },
        (error: any) => {
          console.log("Error updating admin", error.message);
        }
      );
    } else {
      this.accessControlForm2.markAllAsTouched();
    }
  }
  
 */
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
// --------------------------------------------------------------------------------------
searchByName(e: any) {
  let str = e.target.value.toLowerCase();
  this.adminAccessControls = this.adminAccessControls.filter(
    (profile: any) => 
      profile.first_name.toLowerCase().includes(str) || 
      profile.last_name.toLowerCase().includes(str)
  );
}
// ---------------------------------------------------------------------------------------------
  
onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    console.log(event.target.files);
    const img = event.target?.files[0];
    this.profileImage = img;

    if (img) {
      const fileName=img.name
      console.log('Selected file name:', fileName);
      this.accessControlForm.patchValue({ file:img });
    }
  }

  displaySelectedFile(event: any): void {
   
  
      this.selectedFile = event.target.files[0] as File;
  
      if (this.selectedFile) {
        const fileName = this.selectedFile.name;
        console.log('Selected file name:', fileName);
  
        // Display the selected image
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
          this.accessControlForm.patchValue({ file: this.selectedFile });
        };
        reader.readAsDataURL(this.selectedFile);}
  
  }
     getPermissionsByIds(jsonString: string) {
        const parsedJson = JSON.parse(JSON.parse(jsonString));
        const permissionsArray = parsedJson.permissions;
        const arr = permissionsArray.map((id: number) => {

          const permission = this.permissionsData.find((permission: any) => permission.id === id);
          return permission ? permission.name : "";
        });
        if (arr.length <= 3) return [arr,0];
       else return [arr.slice(0, 3), arr.length - 3];
      }
  getImageUrl(filename: string){
    return `${this.assetUrl}uploads/${filename}`
  }

  verifiyPasswordToggle(val:boolean) {
    this.passwordVerified = val
  }

  
  showUserDetails(val: boolean, data?: any) {
    if (data) {
      this.userDetails = data;
      this.viewDetails = val;

  
      const parsedJson = JSON.parse(JSON.parse(this.userDetails.admin_permissions));
    

        this.userPermissions = parsedJson.permissions.map((id: number) => {
          console.log(this.permissionsData)
          const permission = this.permissionsData.find((permission: any) => permission.id === id);
          return permission ? permission.name : null;
      
        });
        
      
    }
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