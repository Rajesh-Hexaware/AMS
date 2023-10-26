import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/core.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { routes } from 'src/app/core/helpers/routes';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-importproduct',
  templateUrl: './importproduct.component.html',
  styleUrls: ['./importproduct.component.scss']
})
export class ImportproductComponent implements OnInit {  
  public routes = routes;
  product:any;
  jsonData:any;
  importformValue!: FormGroup;
  submitted = false;
  id:any
  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute, private sweetlalert: SweetalertService, private formBuilder: FormBuilder, private data: DataService,) {
    this.importformValue = this.formBuilder.group({   
      file: ['', Validators.required],
    });
   }

  ngOnInit(): void {   
  }
  get f() { return this.importformValue.controls; }
  downloadTemplate(): void {
    const templateFilePath = 'assets/AMS-Template.xlsx';

    this.http.get(templateFilePath, { responseType: 'blob' })
      .subscribe(response => {
        const downloadLink = document.createElement('a');
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'AMS-Template.xlsx';
        downloadLink.click();
      });
  }
  onFileChange(event: any): void {        
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming the data is in the first sheet of the Excel file
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      this.jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Process and import the data to the web API
      this.importData(this.jsonData);
    };

    fileReader.readAsArrayBuffer(file);
  }

  importData(data: any[][]): void {         
    const products = []; 
    // Assuming the data starts from the second row (index 1)
    for (let i = 1; i < data.length; i++) {           
      const ProductName = data[i][0];
      const Category = data[i][1];
      const subCategoryName = data[i][2];
      const Brand = data[i][3];
      const Unit = data[i][4];
      const SKU = data[i][5];  
      const minimumqty = data[i][6];  
      const Qty = data[i][7]; 
      const description = data[i][8]; 
      const tax = data[i][9]; 
      const discount = data[i][10]; 
      const price = data[i][11]; 
      const status = data[i][12]; 
      const img = data[i][13]; 
       this.product = {   
        id : new Date().getTime(), 
        ProductName,
        Category,
        subCategoryName,
        Brand,
        Unit,
        SKU,
        minimumqty,
        Qty,
        description,
        tax,
        discount,
        price,
        status,
        img     
      };  
      products.push(this.product);
    }
    // Send the data to the web API    
  }
  onSubmit(){    
    this.submitted = true;
    if (this.importformValue.invalid) {
      return;
    }
    this.data.postProductData(this.product).subscribe((response: any) => {         
      this.sweetlalert.successBtn();      
      this.router.navigate([this.routes.productList]);     
    });
  }
}
