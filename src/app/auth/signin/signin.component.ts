import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes';
import { DataService } from 'src/app/core/service/data/data.service';
import { WebstorgeService } from 'src/app/shared/webstorge.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public routes = routes;
  password: any;
  show = false;
  public CustomControler: any;
  form = new FormGroup({
    email: new FormControl('user@dreamguystech.com', [Validators.required]),
    password: new FormControl('12345', [Validators.required]),
  });
  userData: any=[];

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebstorgeService,private data :DataService) {}

  ngOnInit() {
    this.password = 'password';
  }

  submit() {
    if (this.form.valid) {
      this.data.getUserList().subscribe(res=>{
       this.userData = res
        var target= this.userData.filter((temp:any)=>{ return (temp.email == this.form.value.email)})
        if(target.length>0){
          if(target[0].Password==this.form.value.password){
            this.storage.Login(target[0]);
          }
          else{
            alert("Please check the password") 
          }
        }
        else{
         alert("User Doesn't exists")
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
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
}
