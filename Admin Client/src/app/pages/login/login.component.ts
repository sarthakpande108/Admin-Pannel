import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare let $: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private route: Router) { }
  regexEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  formError: boolean = false;
  passwordError: any
  emailError: any
  login(e: any) {
    e.preventDefault();
    let password = $('#password').val();
    let email = $('#email').val();
    if (email == null || email == undefined || email == '') {
      $('#email').addClass('error-b');
      this.emailError = 'Email is required';
      this.formError = true;
    } else if (!this.regexEmail.test(email)) {
      $('#email').addClass('error-b');
      this.emailError = 'please enter a valid email address';
      this.formError = true;
    } else if (email!="development@productry.in") {
      $('#email').addClass('error-b');
      this.emailError = 'Invalid cridentials';
      this.formError = true;
    } else if (password == null || password == undefined || password == '') {
       $('#email').removeClass('error-b');
      $('#password').addClass('error-b');
      this.formError = true;
       this.passwordError = "Password is required"
    }else if (password != "productry@123") {
       $('#password').addClass('error-b');
       this.formError = true;
       this.passwordError = "Invalid cridentials"
    } else {
      this.formError = false;
      localStorage.setItem("isLoggedIn", "true");
      this.route.navigateByUrl('/')
    }
  }

}
