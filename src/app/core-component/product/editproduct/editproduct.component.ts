import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes';
import { AddProductModel } from '../addproduct/addproduct.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { DataService } from 'src/app/core/core.index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  addProductModelObj: AddProductModel = new AddProductModel();
  public routes = routes;
  productformValue!: FormGroup;
  submitted = false;
  productImage: any;
  convertedImg: any;
  sub: any;
  categoryList: any;
  subCategoryList: any;
  brandList: any;
  taxList: any;
  productEditImage: any;
  unitList = [
    { value: '1', name: 'Peice' },
    { value: '2', name: 'kg' },
  ];
  discountList = [
    { value: '1', name: '10%' },
    { value: '2', name: '20%' },
    { value: '3', name: '30%' },
  ];
  statusList = [
    { value: '1', name: 'Active' },
    { value: '2', name: 'Closed' },
  ];
  imageName: any;
  splitImage: any;

  constructor(private router: Router, private route: ActivatedRoute, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
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
    });

  }

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe((params: any) => {
      let param = params.params.id;
      this.getProductById(param);
    });
    this.getProductBrandList();
    this.getProductCategoryList();
    this.getTaxRateList();
    this.getProductSubCategoryList();
    this.unitList;
    this.discountList;
  }
  get f() { return this.productformValue.controls; }

  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
    this.data.upload(this.productImage).subscribe((res: any) => {
      this.convertedImg = res.data.url;
    });
  }
  getProductById(id: any) {    
    this.data.getProductListById(id).subscribe(res => {
      this.productEditImage = res.img;
      if (this.productEditImage) {
        this.splitImage = this.productEditImage.split('/');
        this.imageName = this.splitImage[4];
      }
      this.updateProduct(res);
    })

  }
  updateProduct(row: any) {    
    this.addProductModelObj.id = row.id,
    this.productformValue.controls['ProductName'].setValue(row.ProductName);
    this.productformValue.controls['Category'].setValue(row.Category);
    this.productformValue.controls['subCategoryName'].setValue(row.subCategoryName);
    this.productformValue.controls['Brand'].setValue(row.Brand);
    this.productformValue.controls['Unit'].setValue(row.Unit);
    this.productformValue.controls['SKU'].setValue(row.SKU);
    this.productformValue.controls['minimumqty'].setValue(row.minimumqty);
    this.productformValue.controls['Qty'].setValue(row.Qty);
    this.productformValue.controls['description'].setValue(row.description);
    this.productformValue.controls['tax'].setValue(row.tax);
    this.productformValue.controls['discount'].setValue(row.discount);
    this.productformValue.controls['price'].setValue(row.price);
    this.productformValue.controls['status'].setValue(row.status);
    this.addProductModelObj.img = this.convertedImg;

  }
  onUpdateProduct() {    
    this.submitted = true;
    if (this.productEditImage && !this.convertedImg) {      
      this.productformValue.get('img')?.clearValidators();
      this.productformValue.get('img')?.updateValueAndValidity();
      this.addProductModelObj.img = this.productEditImage;
    }
    else {
      this.addProductModelObj.img = this.convertedImg;
    }
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

    let cancel = document.getElementById("cancel");
    this.data.updateProductData(this.addProductModelObj, this.addProductModelObj.id).subscribe(a => {
      cancel?.click();
      this.sweetlalert.successBtn();
      this.router.navigate([this.routes.productList]);
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
