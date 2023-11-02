import { Component, OnInit } from '@angular/core';
import { AddCategoryModel } from '../addcategory/addcategory.model';
import { routes } from 'src/app/core/helpers/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { DataService } from 'src/app/core/core.index';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {
  addCategoryModelObj: AddCategoryModel = new AddCategoryModel();
  public routes = routes; 
  categoryformValue!: FormGroup;
  submitted = false;
  productImage: any;
  convertedImg: any;
  sub: any;
  productCategoryImage: any;
  splitImage: any;
  imageName: any;
  constructor(private route: ActivatedRoute, private router: Router, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
    this.categoryformValue = this.formBuilder.group({
      Categoryname: ['', [Validators.required, Validators.minLength(4)]],
      CategoryCode: ['', Validators.required],
      Description: ['', Validators.required],
      img: ['', Validators.required],
    });
   }

  ngOnInit(): void {    
    this.sub = this.route.queryParamMap.subscribe((params:any) => {      
      let param = params.params.Id;   
      // this.getCategoryById(param);
      setTimeout(() => {this.getCategoryById(param)},1000);
    });   
  }
  get f() { return this.categoryformValue.controls; }
  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
    this.data.uploadCategory(this.productImage).subscribe((res: any) => {
      this.convertedImg = res.data.url;     
    });
  }
  getCategoryById(id:any){     
    this.data.getCategoryListById(id).subscribe(res=>{
      this.productCategoryImage = res[0].img;
      if (this.productCategoryImage) {
        this.splitImage = this.productCategoryImage.split('/');
        this.imageName = this.splitImage[4];
      }
      this.updateCaregory(res);
    })
  }
  updateCaregory(row: any){    
    this.addCategoryModelObj.id = row[0].Id,
    this.categoryformValue.controls['Categoryname'].setValue(row[0].Categoryname);
    this.categoryformValue.controls['CategoryCode'].setValue(row[0].CategoryCode);
    this.categoryformValue.controls['Description'].setValue(row[0].Description);   
    this.addCategoryModelObj.img = this.convertedImg;   

  }
  onUpdateCategory() {    
    this.submitted = true;
    if (this.productCategoryImage && !this.convertedImg) {      
      this.categoryformValue.get('img')?.clearValidators();
      this.categoryformValue.get('img')?.updateValueAndValidity();
      this.addCategoryModelObj.img = this.productCategoryImage;
    }
    else {
      this.addCategoryModelObj.img = this.convertedImg;
    }
    if (this.categoryformValue.invalid) {
      return;
    }
    this.addCategoryModelObj.Categoryname = this.categoryformValue.value.Categoryname;
    this.addCategoryModelObj.CategoryCode = this.categoryformValue.value.CategoryCode;
    this.addCategoryModelObj.Description = this.categoryformValue.value.Description;  
    // this.addCategoryModelObj.img = this.convertedImg;

    let cancel = document.getElementById("cancel");
    this.data.updateCategoryList(this.addCategoryModelObj, this.addCategoryModelObj.id).subscribe(a => {
      cancel?.click();
      this.sweetlalert.successBtn();    
      this.router.navigate([this.routes.categoryList]);
    },
      error => {
        console.error('Error', error);
        this.sweetlalert.errorBtn();
      });
  }
}
