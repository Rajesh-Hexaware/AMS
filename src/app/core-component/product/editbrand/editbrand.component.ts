import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routes, DataService } from 'src/app/core/core.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { AddBrandModel } from '../addbrand/addbrand.model';

@Component({
  selector: 'app-editbrand',
  templateUrl: './editbrand.component.html',
  styleUrls: ['./editbrand.component.scss']
})
export class EditbrandComponent implements OnInit {
  addBrandModelObj: AddBrandModel = new AddBrandModel();
  public routes = routes;
  brandformValue!: FormGroup;
  submitted = false;
  productImage: any;
  convertedImg: any;
  sub: any;
  show: boolean = false
  productBrandImage: any;
  splitImage: any;
  imageName: any;
  constructor(private route: ActivatedRoute, private router: Router, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
    this.brandformValue = this.formBuilder.group({
      BrandName: ['', [Validators.required, Validators.minLength(4)]],
      BrandDescription: ['', Validators.required],
      Image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe((params: any) => {
      let param = params.params.id;
      this.getBrandListById(param);
    });
  }

  get f() { return this.brandformValue.controls; }
  onCancel() {
    this.show = !this.show
  }
  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
    this.data.uploadBrand(this.productImage).subscribe((res: any) => {
      this.convertedImg = res.data.url;
    });
  }
  getBrandListById(id: any) {
    this.data.getBrandListById(id).subscribe(res => {
      this.productBrandImage = res.Image;
      if (this.productBrandImage) {
        this.splitImage = this.productBrandImage.split('/');
        this.imageName = this.splitImage[4];
      }
      this.updateBrand(res);
    })
  }
  updateBrand(row: any) {
    this.addBrandModelObj.id = row.id,
      this.brandformValue.controls['BrandName'].setValue(row.BrandName);
    this.brandformValue.controls['BrandDescription'].setValue(row.BrandDescription);
    this.addBrandModelObj.Image = this.convertedImg;

  }
  updateBranddata() {
    this.submitted = true;
    if (this.productBrandImage && !this.convertedImg) {
      this.brandformValue.get('Image')?.clearValidators();
      this.brandformValue.get('Image')?.updateValueAndValidity();
      this.addBrandModelObj.Image = this.productBrandImage;
    }
    else {
      this.addBrandModelObj.Image = this.convertedImg;
    }
    if (this.brandformValue.invalid) {
      return;
    }
    this.addBrandModelObj.BrandName = this.brandformValue.value.BrandName;
    this.addBrandModelObj.BrandDescription = this.brandformValue.value.BrandDescription;
    // this.addBrandModelObj.Image = this.convertedImg;

    let cancel = document.getElementById("cancel");
    this.data.updateBrandList(this.addBrandModelObj, this.addBrandModelObj.id).subscribe(a => {
      cancel?.click();
      this.sweetlalert.successBtn();
      this.router.navigate([this.routes.brandList]);
    },
      error => {
        console.error('Error', error);
        this.sweetlalert.errorBtn();
      });
  }
}
