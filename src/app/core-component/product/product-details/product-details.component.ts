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
      let param = params.params.id;
      this.getProductDetailsById(param);
    });
  }
  getProductDetailsById(id: any) {
    this.data.getProductListById(id).subscribe(res => {   
      this.productDetails = res;
      this.brandName = res.Brand;
      this.categoryName = res.Category;
      this.description = res.description;
      this.discount = res.discount;
      this.minimumqty = res.minimumqty;
      this.price = res.price;
      this.productImage = res.img;
      this.productName = res.ProductName;
      this.quantity = res.Qty;
      this.sku = res.SKU;
      this.status = res.status;
      this.subCategoryName = res.subCategoryName;
      this.tax = res.tax;
      this.unit = res.Unit;
    });
  }
  printTable(): void {
    window.print();
  }
}
