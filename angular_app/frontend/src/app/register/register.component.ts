import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData:any={}
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  constructor(private authService:AuthService) { }
 
  ngOnInit(): void {
  }

  post(){
    this.registerData.email=this.emailFormControl.value;
    this.registerData.pwd=this.passwordFormControl.value
    this.authService.registerUser(this.registerData);
  }
}