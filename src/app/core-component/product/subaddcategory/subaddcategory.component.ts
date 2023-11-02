import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes';
import { DataService } from 'src/app/core/core.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { SubAddCategoryModel } from './subAddCategory.model';

@Component({
  selector: 'app-subaddcategory',
  templateUrl: './subaddcategory.component.html',
  styleUrls: ['./subaddcategory.component.scss']
})
export class SubaddcategoryComponent implements OnInit {
  subAddCategoryModelObj: SubAddCategoryModel = new SubAddCategoryModel();
  public routes = routes;
  categoryformValue!: FormGroup;
  submitted = false; 
  subCategoryList: any;
  constructor(private router: Router, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
    this.categoryformValue = this.formBuilder.group({
      Parentcategory: ['', Validators.required],
      Category: ['', Validators.required],
      CategoryCode: ['', Validators.required],
      Description: ['', Validators.required],    
    });
   }

  ngOnInit(): void {    
    this.getSubCategory();
  }
  get f() { return this.categoryformValue.controls; }
  onSubmit() {  
    this.submitted = true;
    if (this.categoryformValue.invalid) {
      return;
    }
    this.subAddCategoryModelObj.Parentcategory = this.categoryformValue.value.Parentcategory;
    this.subAddCategoryModelObj.Category = this.categoryformValue.value.Category;
    this.subAddCategoryModelObj.CategoryCode = this.categoryformValue.value.CategoryCode;  
    this.subAddCategoryModelObj.Description = this.categoryformValue.value.Description;      
    this.subAddCategoryModelObj.id = this.categoryformValue.value.id;
    this.subAddCategoryModelObj.CreatedBy= localStorage.getItem("Username");
    if (!this.subAddCategoryModelObj.id) {
      this.subAddCategoryModelObj.id = new Date().getTime();
    }
    let cancel = document.getElementById("cancel");
    this.data.postSubcategoryList(this.subAddCategoryModelObj).subscribe(a => {
      cancel?.click();
      this.sweetlalert.successBtn();
      this.router.navigate([this.routes.subCategoryList]);
      // this.productformValue.reset();
    },
      error => {
        console.error('Error', error);
        this.sweetlalert.errorBtn();
      });
  }
  getSubCategory(){  
    this.data.getCategoryList().subscribe(res=>{        
      this.subCategoryList = res;     
    });
  }
}
