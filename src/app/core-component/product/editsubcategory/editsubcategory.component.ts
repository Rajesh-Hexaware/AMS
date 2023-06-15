import { Component, OnInit } from '@angular/core';
import { SubAddCategoryModel } from '../subaddcategory/subAddCategory.model';
import { routes } from 'src/app/core/helpers/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { DataService } from 'src/app/core/core.index';

@Component({
  selector: 'app-editsubcategory',
  templateUrl: './editsubcategory.component.html',
  styleUrls: ['./editsubcategory.component.scss']
})
export class EditsubcategoryComponent implements OnInit {
  subAddCategoryModelObj: SubAddCategoryModel = new SubAddCategoryModel();
  public routes = routes;
  categoryformValue!: FormGroup;
  submitted = false; 
  subCategoryList: any;
  sub: any;
 
  constructor(private route: ActivatedRoute, private router: Router, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) { 
    this.categoryformValue = this.formBuilder.group({
      Parentcategory: ['', Validators.required],
      Category: ['', Validators.required],
      CategoryCode: ['', Validators.required],
      Description: ['', Validators.required],    
    });
  }

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe((params:any) => {    
      let param = params.params.id;   
      this.getSubcategoryListtById(param);
    });   
    this.getSubCategory();
  }
  getSubcategoryListtById(id:any){
    this.data.getSubcategoryListtById(id).subscribe(res=>{
      this.updateSubCategory(res);
    })
  }
  get f() { return this.categoryformValue.controls; }

  updateSubCategory(row: any){
    this.subAddCategoryModelObj.id = row.id,
    this.categoryformValue.controls['Parentcategory'].setValue(row.Parentcategory);
    this.categoryformValue.controls['Category'].setValue(row.Category);  
    this.categoryformValue.controls['CategoryCode'].setValue(row.CategoryCode);  
    this.categoryformValue.controls['Description'].setValue(row.Description);  
   
  }
updateSubCategoryData(){
  this.submitted = true;
  if (this.categoryformValue.invalid) {
    return;
  }
  this.subAddCategoryModelObj.Parentcategory = this.categoryformValue.value.Parentcategory;    
  this.subAddCategoryModelObj.Category = this.categoryformValue.value.Category;  
  this.subAddCategoryModelObj.CategoryCode = this.categoryformValue.value.CategoryCode; 
  this.subAddCategoryModelObj.Description = this.categoryformValue.value.Description; 

  let cancel = document.getElementById("cancel");
  this.data.updateSubcategoryList(this.subAddCategoryModelObj, this.subAddCategoryModelObj.id).subscribe(a => {
    cancel?.click();
    this.sweetlalert.successBtn();    
    this.router.navigate([this.routes.subCategoryList]);
  },
    error => {
      console.error('Error', error);
      this.sweetlalert.errorBtn();
    });
}
  getSubCategory(){   
    this.data.getSubcategoryList().subscribe(res=>{     
      this.subCategoryList = res;      
    });
  }
}
