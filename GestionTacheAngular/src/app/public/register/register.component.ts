import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../service/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrationFormGroup! : FormGroup;
  errorMessage : any;
  formStatus : number=0;
  constructor(private fb : FormBuilder,
              private router : Router,
              private authService : AuthServiceService
              ,
  ) {
  }
  ngOnInit() {
    this.registrationFormGroup=this.fb.group({
      username : this.fb.control('', Validators.required),
      firstName : this.fb.control('', Validators.required),
      lastName : this.fb.control('', Validators.required),
      email : this.fb.control('', Validators.required),
      password : this.fb.control('', Validators.required),
      confirmPassword : this.fb.control('', Validators.required),
      role : this.fb.control('', Validators.required),
    });
  }

  get username() {
    return this.registrationFormGroup.controls['username'];
  }
  get firstName() {
    return this.registrationFormGroup.controls['firstName'];
  }
  get lastName() {
    return this.registrationFormGroup.controls['lastName'];
  }
  get email() {
    return this.registrationFormGroup.controls['email'];
  }
  get password() {
    return this.registrationFormGroup.controls['password'];
  }
  get confirmPassword() {
    return this.registrationFormGroup.controls['confirmPassword'];
  }
  get role() {
    return this.registrationFormGroup.controls['role'];
  }
  get userType() {
    return this.registrationFormGroup.controls['userType'];
  }

  registerUser() {
    this.authService.registerUser(this.registrationFormGroup.value).subscribe({
      next : value => {
        this.formStatus=1;
        console.log("register ")
        this.router.navigateByUrl("task");
      },
      error : err => {
        this.formStatus=2;
        this.errorMessage=err.error.error;
      }
    })
  } }
