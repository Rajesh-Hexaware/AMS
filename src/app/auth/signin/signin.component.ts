import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes';
import { WebstorgeService } from 'src/app/shared/webstorge.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
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
    email: new FormControl('user@dreamguystech.com', [Validators.required]),
    password: new FormControl('12345', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebstorgeService, private authService: SocialAuthService, private router: Router) { }

  ngOnInit() {
    this.password = 'password';
    this.googleSignin();
   
  }

  googleSignin() {
    this.authService.authState.subscribe((user) => {
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
    if (this.form.valid) {
      this.storage.Login(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  ngOnDestroy() { }

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
