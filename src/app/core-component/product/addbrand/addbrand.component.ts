import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { AddBrandModel } from './addbrand.model';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.scss']
})
export class AddbrandComponent implements OnInit {
  addBrandModelObj: AddBrandModel = new AddBrandModel();
  public routes = routes;
  brandformValue!: FormGroup;
  submitted = false;
  productImage: any;
  convertedImg: any;
  constructor(private router: Router, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
    this.brandformValue = this.formBuilder.group({
      BrandName: ['', [Validators.required, Validators.minLength(4)]],   
      BrandDescription: ['', Validators.required],
      Image: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }
  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
    this.data.uploadBrand(this.productImage).subscribe((res: any) => {
      this.convertedImg = res.data.url;      
    });
  }
  get f() { return this.brandformValue.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.brandformValue.invalid) {
      return;
    }
    this.addBrandModelObj.BrandName = this.brandformValue.value.BrandName;    
    this.addBrandModelObj.BrandDescription = this.brandformValue.value.BrandDescription;
    this.addBrandModelObj.Image = this.convertedImg;
    this.addBrandModelObj.id = this.brandformValue.value.id;
    if (!this.addBrandModelObj.id) {
      this.addBrandModelObj.id = 1;
    }
    let cancel = document.getElementById("cancel");
    this.data.postBrandList(this.addBrandModelObj).subscribe(a => {
      cancel?.click();
      this.sweetlalert.successBtn();
      this.router.navigate([this.routes.brandList]);
      // this.productformValue.reset();
    },
      error => {
        console.error('Error', error);
        this.sweetlalert.errorBtn();
      });
  }
}
