import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
// import ShortUniqueId from 'short-unique-id';
import { routes } from 'src/app/core/helpers/routes';
import { DataService } from 'src/app/core/service/data/data.service';
import { signupModel } from "./signup.model";
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public routes = routes;
  sinupForm: FormGroup;
  submitted = false;
  password = 'password';
  show = false;
  public CustomControler: any;
  
  constructor(private fb: FormBuilder,private sweetlalert: SweetalertService,private data :DataService){
    this.sinupForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',  [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  
  get f() {
    return this.sinupForm.controls;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if(this.sinupForm.valid){
    // const uid = new ShortUniqueId({ length: 10 })
      const date = new Date();
      let signupData:signupModel = new signupModel() ;
      signupData.Username=this.sinupForm.value.name
      signupData.Phone="+12163547758"
      signupData.Password=this.sinupForm.value.password
      signupData.email=this.sinupForm.value.email
      signupData.isSelected=false
      signupData.Role="Admin"
      signupData.CreatedOn=date.toLocaleDateString()
      signupData.Status="Active"
      signupData.id=new Date().getTime();
      this.data.postUser(signupData).subscribe((res:any)=>{
        this.sweetlalert.successBtn();
      })
    }
    else {
      this.sinupForm.markAllAsTouched();
    }
    }
}
