import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes';
import { AddCategoryModel } from './addcategory.model';
import { DataService } from 'src/app/core/core.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  addCategoryModelObj: AddCategoryModel = new AddCategoryModel();
  public routes = routes;
  categoryformValue!: FormGroup;
  submitted = false;
  productImage: any;
  convertedImg: any;
  constructor(private router: Router, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
    this.categoryformValue = this.formBuilder.group({
      Categoryname: ['', [Validators.required, Validators.minLength(4)]],
      CategoryCode: ['', Validators.required],
      Description: ['', Validators.required],
      img: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }
  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
    this.data.uploadCategory(this.productImage).subscribe((res: any) => {
      this.convertedImg = res.data.url;     
    });
  }
  get f() { return this.categoryformValue.controls; }
  onSubmit() {  
    this.submitted = true;
    if (this.categoryformValue.invalid) {
      return;
    }
    this.addCategoryModelObj.Categoryname = this.categoryformValue.value.Categoryname;
    this.addCategoryModelObj.CategoryCode = this.categoryformValue.value.CategoryCode;
    this.addCategoryModelObj.Description = this.categoryformValue.value.Description;
    this.addCategoryModelObj.img = this.convertedImg;
    this.addCategoryModelObj.id = this.categoryformValue.value.id;
    if (!this.addCategoryModelObj.id) {
      this.addCategoryModelObj.id = 1;
    }
    let cancel = document.getElementById("cancel");
    this.data.postCategoryList(this.addCategoryModelObj).subscribe(a => {
      cancel?.click();
      this.sweetlalert.successBtn();
      this.router.navigate([this.routes.categoryList]);
      // this.productformValue.reset();
    },
      error => {
        console.error('Error', error);
        this.sweetlalert.errorBtn();
      });
  }
}
