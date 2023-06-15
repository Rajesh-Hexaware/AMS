import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { AddProductModel } from './addproduct.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  addProductModelObj: AddProductModel = new AddProductModel();
  public routes = routes;
  productformValue!: FormGroup;
  submitted = false;
  productImage: any;
  convertedImg: any;
  categoryList: any;
  subCategoryList: any;
  brandList: any;
  taxList: any;
  id: number = 0;
  unitList = [
    { value: '1', name: 'Peice'},
    { value: '2', name: 'kg' },
  ];
   discountList = [
    { value: '1', name: '10%'},
    { value: '2', name: '20%' },
    { value: '3', name: '30%' },
  ];
  statusList=[
    { value: '1', name: 'Active'},
    { value: '2', name: 'Closed' },
  ];
  constructor(private router: Router, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
    this.productformValue = this.formBuilder.group({
      ProductName: ['', [Validators.required, Validators.minLength(4)]],
      Category: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      Brand: ['', Validators.required],
      Unit: ['', Validators.required],
      SKU: ['', Validators.required],
      minimumqty: ['', Validators.required],
      Qty: ['', Validators.required],
      description: ['', Validators.required],
      tax: ['', Validators.required],
      discount: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      img: ['', Validators.required],
    })
  }


  ngOnInit(): void {
    this.getProductBrandList();
    this.getProductCategoryList();
    this.getTaxRateList();
    this.getProductSubCategoryList();
  }
  get f() { return this.productformValue.controls; }

  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
    this.data.upload(this.productImage).subscribe((res: any) => {
      this.convertedImg = res.data.url;     
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.productformValue.invalid) {
      return;
    }
    this.addProductModelObj.ProductName = this.productformValue.value.ProductName;
    this.addProductModelObj.Category = this.productformValue.value.Category;
    this.addProductModelObj.subCategoryName = this.productformValue.value.subCategoryName;
    this.addProductModelObj.Brand = this.productformValue.value.Brand;
    this.addProductModelObj.Unit = this.productformValue.value.Unit;
    this.addProductModelObj.SKU = this.productformValue.value.SKU;
    this.addProductModelObj.minimumqty = this.productformValue.value.minimumqty;
    this.addProductModelObj.Qty = this.productformValue.value.Qty;
    this.addProductModelObj.description = this.productformValue.value.description;
    this.addProductModelObj.tax = this.productformValue.value.tax;
    this.addProductModelObj.discount = this.productformValue.value.discount;
    this.addProductModelObj.price = this.productformValue.value.price;
    this.addProductModelObj.status = this.productformValue.value.status;
    this.addProductModelObj.img = this.convertedImg;
    this.addProductModelObj.id = this.productformValue.value.id;
    if (!this.addProductModelObj.id) {
      this.addProductModelObj.id = 0;
    }else{
      this.addProductModelObj.id = 1;
    }
    
    let cancel = document.getElementById("cancel");
    this.data.postProductData(this.addProductModelObj).subscribe(a => {
      cancel?.click();
      this.sweetlalert.successBtn();
      this.router.navigate([this.routes.productList]);
      // this.productformValue.reset();
    },
      error => {
        console.error('Error', error);
        this.sweetlalert.errorBtn();
      });
  }
  getProductCategoryList() {
    this.data.getCategoryList().subscribe(res => {
      this.categoryList = res;
    });
  }
  getProductSubCategoryList() {
    this.data.getSubcategoryList().subscribe(res => {
      this.subCategoryList = res;
    });

  }
  getProductBrandList() {
    this.data.getBrandList().subscribe(res => {
      this.brandList = res;
    });
  }
  getTaxRateList() {
    this.data.getTaxRates().subscribe(res => {
      this.taxList = res;
    });
  }
}
