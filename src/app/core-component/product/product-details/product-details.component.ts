import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/core/core.index';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  sub: any;
  productDetails: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
    },
    nav: true,
  };
  brandName: any;
  categoryName: any;
  description: any;
  discount: any;
  minimumqty: any;
  price: any;
  productImage: any;
  productName: any;
  quantity: any;
  sku: any;
  status: any;
  subCategoryName: any;
  tax: any;
  unit: any;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe((params: any) => {
      let param = params.params.Id;
      this.getProductDetailsById(param);
    });
  }
  getProductDetailsById(Id: any) {
    this.data.getProductListById(Id).subscribe(res => {              
      this.productDetails = res[0];
      this.brandName = this.productDetails.Brand;
      this.categoryName = this.productDetails.Category;
      this.description = this.productDetails.Description;
      this.discount = this.productDetails.Discount;
      this.minimumqty = this.productDetails.MinimumQty;
      this.price = this.productDetails.price;
      this.productImage = this.productDetails.img;
      this.productName = this.productDetails.ProductName;
      this.quantity = this.productDetails.Qty;
      this.sku = this.productDetails.SKU;
      this.status = this.productDetails.Status;
      this.subCategoryName = this.productDetails.SubCategoryName;
      this.tax = this.productDetails.Tax;
      this.unit = this.productDetails.Unit;
    });
  }
  printTable(): void {
    // window.print();
    const printContents: any = document.getElementById('printTable')?.outerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}
