import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes';
import { DataService } from 'src/app/core/service/data/data.service';
import { WebstorgeService } from 'src/app/shared/webstorge.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from '../../app.component';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public routes = routes;
  password: any;
  show = false;
  user!: SocialUser;
  loggedIn: any;
  public CustomControler: any;
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  userData: any=[];
  accessToken: any;
  sub: any;
  submitted: boolean=false;
  get f() {
    return this.form.controls;
  }
  constructor(private storage: WebstorgeService,private data: DataService,private sweetlalert: SweetalertService,  private authService: SocialAuthService, private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    this.password = 'password';
    this.sub = this.route.queryParamMap.subscribe((params:any) => {
      let param = params.params.page;
      if(!param || browserRefresh){
        this.googleSignin();
      }
    });    
         
  }

  googleSignin(): void {
    this.authService.authState.subscribe((user:any) => {
      this.user = user;
      this.storage.Login(this.user);
      this.loggedIn = (user != null);
    });
  }
  signInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  submit() {
   this.submitted =true
    if (this.form.valid) {
      this.data.getUserList().subscribe(res=>{
       this.userData = res
        var target= this.userData.filter((temp:any)=>{ return (temp.email == this.form.value.email)})
        if(target.length>0){
          if(target[0].Password==this.form.value.password){
            this.storage.Login(target[0]);
          }
          else{
            this.sweetlalert.signinerrorBtn("Please check the password");
          }
        }
        else{
          this.sweetlalert.signinerrorBtn("User Doesn't exists");
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
  ngOnDestroy() { 
    this.sub.unsubscribe();
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  signOut(): void {
    this.authService.signOut();
  } 
}
